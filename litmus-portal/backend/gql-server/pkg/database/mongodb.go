package database

import (
	"context"
	"log"
	"os"
	"time" 

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var clusterCollection *mongo.Collection
var backgroundContext = context.Background()

var err error
var collection = map[string]string{
	"Cluster" : "cluster-collection",
}

var db = "litmus"