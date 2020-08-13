# Makefile for building Litmus Portal
# Reference Guide - https://www.gnu.org/software/make/manual/make.html

#
# Internal variables or constants.
# NOTE - These will be executed when any make target is invoked.
#
IS_DOCKER_INSTALLED = $(shell which docker >> /dev/null 2>&1; echo $$?)

#docker info
REPONAME ?= kaleoum
GRAPHQL_SERVER_IMAGE ?= litmusportal-server
<<<<<<< HEAD
=======
AUTHENTICATION_SERVER_IMAGE ?= litmusportal-auth-server
FRONTEND_IMAGE ?= litmusportal-frontend
SUBSCRIBER_IMAGE ?= litmusportal-subscriber
SELF_DEPLOYER_IMAGE ?= litmusportal-self-deployer
>>>>>>> upstream/litmus-portal
IMGTAG ?= ci

.PHONY: build
build: litmus-portal-build

litmus-portal-build:
	@echo "------------------"
	@echo "--> Build frontend and backend images" 
	@echo "------------------"
	docker build ./backend/graphql-server -f backend/graphql-server/build/Dockerfile -t $(REPONAME)/$(GRAPHQL_SERVER_IMAGE):$(IMGTAG)
<<<<<<< HEAD
=======
	docker build ./backend/auth -f backend/auth/Dockerfile -t $(REPONAME)/$(AUTHENTICATION_SERVER_IMAGE):$(IMGTAG)
	docker build ./backend/subscriber -f backend/subscriber/build/Dockerfile -t $(REPONAME)/$(SUBSCRIBER_IMAGE):$(IMGTAG)
	docker build ./backend/self-deployer -f backend/self-deployer/build/Dockerfile -t $(REPONAME)/$(SELF_DEPLOYER_IMAGE):$(IMGTAG)
>>>>>>> upstream/litmus-portal

.PHONY: push
push: litmus-portal-push

litmus-portal-push:
	@echo "------------------"
	@echo "--> Push frontend and backend images" 
	@echo "------------------"
	REPONAME=$(REPONAME) IMGNAME=$(GRAPHQL_SERVER_IMAGE) IMGTAG=$(IMGTAG) ../hack/push
<<<<<<< HEAD
	
=======
	REPONAME=$(REPONAME) IMGNAME=$(SUBSCRIBER_IMAGE) IMGTAG=$(IMGTAG) ../hack/push
	REPONAME=$(REPONAME) IMGNAME=$(AUTHENTICATION_SERVER_IMAGE) IMGTAG=$(IMGTAG) ../hack/push
	REPONAME=$(REPONAME) IMGNAME=$(SELF_DEPLOYER_IMAGE) IMGTAG=$(IMGTAG) ../hack/push


>>>>>>> upstream/litmus-portal
.PHONY: litmus-portal-check
litmus-portal-check : lint-checks unused-package-check
