package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/oumkale/gql-server/graph/generated"
	"github.com/oumkale/gql-server/graph/model"
)

func (r *mutationResolver) UserClusterReg(ctx context.Context, clusterInput model.ClusterInput) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) ClusterConfirm(ctx context.Context, identity model.ClusterIdentity) (*model.ClusterConfirmResponse, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) NewClusterEvent(ctx context.Context, clusterEvent model.ClusterEventInput) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateChaosWorkFlow(ctx context.Context, input *model.ChaosWorkFlowInput) (*model.ChaosWorkFlowResponse, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) ClusterEventListener(ctx context.Context, projectID string) (<-chan *model.ClusterEvent, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) ClusterConnect(ctx context.Context, clusterInfo model.ClusterIdentity) (<-chan *model.ClusterAction, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
var clusterPublish map[string]chan *model.ClusterResponse

func init() {
	clusterPublish = map[string]chan *model.ClusterResponse{}
}
func (r *mutationResolver) CreateCluster(ctx context.Context, input model.ClusterInput) (*model.ClusterResponse, error) {

	newCluster := &model.ClusterResponse{
		Data: input.Data,
		ID:   input.ID,
	}
	for _, observer := range clusterPublish {
		observer <- newCluster
	}
	return newCluster, nil
}
func (r *subscriptionResolver) ClusterSubscription(ctx context.Context) (<-chan *model.ClusterResponse, error) {

	id := rand.Int()

	clusterEvent := make(chan *model.ClusterResponse, 1)
	go func() {
		<-ctx.Done()
	}()
	clusterPublish[string(id)] = clusterEvent
	return clusterEvent, nil
}
