package gql

import (
	"encoding/json"
	"log"
	"net/url"
	"time"

	"github.com/gorilla/websocket"
	"github.com/litmuschaos/litmus/litmus-portal/backend/subscriber/pkg/cluster"
	"github.com/litmuschaos/litmus/litmus-portal/backend/subscriber/pkg/types"
)

func ClusterConnect(clusterData map[string]string) {
	query := `{"query":"subscription {\n    clusterConnect(clusterInfo: {cluster_id: \"` + clusterData["CID"] + `\", access_key: \"` + clusterData["KEY"] + `\"}) {\n   \t project_id,\n     action{\n      k8s_manifest,\n      external_data,\n      request_type\n     }\n  }\n}\n"}`
	serverURL, err := url.Parse(clusterData["GQL_SERVER"])
	scheme := "ws"
	if serverURL.Scheme == "https" {
		scheme = "wss"
	}
	u := url.URL{Scheme: scheme, Host: serverURL.Host, Path: "/query"}
	log.Printf("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	go func() {
		time.Sleep(1 * time.Second)
		payload := types.OperationMessage{
			Type: "connection_init",
		}
		data, err := json.Marshal(payload)
		err = c.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			log.Println("write:", err)
			return
		}
		payload = types.OperationMessage{
			Payload: []byte(query),
			Type:    "start",
		}
		data, err = json.Marshal(payload)
		err = c.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			log.Println("write:", err)
			return
		}
	}()
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			return
		}
		var r types.RawData
		err = json.Unmarshal(message, &r)
		if err != nil {
			log.Fatal(err)
		}
		if r.Type == "connection_ack" {
			log.Print("Cluster Connect Established, Listening....")
		}
		if r.Type != "data" {
			continue
		}
		_, err = cluster.ClusterOperations(r.Payload.Data.ClusterConnect.Action.K8SManifest, r.Payload.Data.ClusterConnect.Action.RequestType)
		if err != nil {
			log.Fatal(err)
		}
	}
}
