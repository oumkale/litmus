package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/litmuschaos/litmus/litmus-portal/backend/graphql-server/graph"
	"github.com/litmuschaos/litmus/litmus-portal/backend/graphql-server/graph/generated"
	database "github.com/litmuschaos/litmus/litmus-portal/backend/graphql-server/pkg/database/mongodb"
	"github.com/litmuschaos/litmus/litmus-portal/backend/graphql-server/pkg/file_handlers"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"time"
)

const defaultPort = "8080"

var err error

func init() {
	if os.Getenv("DB_SERVER") == "" || os.Getenv("JWT_SECRET") == "" || os.Getenv("SERVICE_ADDRESS") == "" {
		log.Fatal("Some environment variable are not setup")
	}

	if err = database.DBInit(); err != nil {
		log.Fatal(err)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})
	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	// to be removed in production
	srv.Use(extension.Introspection{})

	router := mux.NewRouter()
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", c.Handler(srv))
	router.HandleFunc("/file/{key}{path:.yaml}", file_handlers.FileHandler)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
