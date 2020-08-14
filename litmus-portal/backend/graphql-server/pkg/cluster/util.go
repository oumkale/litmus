package cluster

import (
	"errors"
	"github.com/litmuschaos/litmus/litmus-portal/backend/graphql-server/pkg/database"
	"log"
    "flag"
    "fmt"
    "path/filepath"

    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
    corev1 "k8s.io/api/core/v1"
    "k8s.io/client-go/kubernetes"
    "k8s.io/client-go/tools/clientcmd"
    "k8s.io/client-go/util/homedir"
	"github.com/litmuschaos/litmus/litmus-portal/backend/graphql-server/graph/model"
)


//VerifyCluster util function used to verify cluster identity
func VerifyCluster(identity model.ClusterIdentity) (*model.Cluster, error) {
	cluster, err := database.GetCluster(identity.ClusterID)
	if err != nil {
		log.Print("ERROR", err)
		return nil, err
	}
	if !(len(cluster) == 1 && cluster[0].AccessKey == identity.AccessKey && cluster[0].IsRegistered) {
		log.Print(len(cluster) == 1, cluster[0].AccessKey == identity.AccessKey, cluster[0].IsRegistered)
		return nil, errors.New("ERROR:  CLUSTER ID MISMATCH")
	}
	return &cluster[0], nil
}

func getIP() {

    var kubeconfig *string
    nodeIP := []corev1.NodeAddress{}

    if home := homedir.HomeDir(); home != "" {
        kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
    } else {
        kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
    }
    flag.Parse()
    // uses the current context in kubeconfig
    config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
    if err != nil {
        panic(err.Error())
    }
    // creates the clientset
    clientset, err := kubernetes.NewForConfig(config)
    if err != nil {
        panic(err.Error())
    }

    nodes, err := clientset.CoreV1().Nodes().List(metav1.ListOptions{})
    if err != nil {
        panic(err)
    }
    
    for i := 0; i < len(nodes.Items); i++ {
        nodeIP = nodes.Items[i].Status.Addresses
        fmt.Println(nodeIP[0].Address)
    }
    //fmt.Println(nodes.Items[0].Status.Addresses)
    //return nodeIP
}
