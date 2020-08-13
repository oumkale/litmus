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
IMGTAG ?= ci

.PHONY: build
build: litmus-portal-build

litmus-portal-build:
	@echo "------------------"
	@echo "--> Build frontend and backend images" 
	@echo "------------------"
	docker build ./backend/graphql-server -f backend/graphql-server/build/Dockerfile -t $(REPONAME)/$(GRAPHQL_SERVER_IMAGE):$(IMGTAG)

.PHONY: push
push: litmus-portal-push

litmus-portal-push:
	@echo "------------------"
	@echo "--> Push frontend and backend images" 
	@echo "------------------"
	REPONAME=$(REPONAME) IMGNAME=$(GRAPHQL_SERVER_IMAGE) IMGTAG=$(IMGTAG) ../hack/push
	
.PHONY: litmus-portal-check
litmus-portal-check : lint-checks unused-package-check
