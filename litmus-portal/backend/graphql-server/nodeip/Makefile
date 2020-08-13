# Makefile for building Litmus Portal
# Reference Guide - https://www.gnu.org/software/make/manual/make.html

#
# Internal variables or constants.
# NOTE - These will be executed when any make target is invoked.
#
IS_DOCKER_INSTALLED = $(shell which docker >> /dev/null 2>&1; echo $$?)

#docker info
REPONAME ?= litmuschaos
GRAPHQL_SERVER_IMAGE ?= litmusportal-server
IMGTAG ?= ci

.PHONY: all
all: deps litmus-portal-check litmus-portal-test build push

.PHONY: help
help:
	@echo ""
	@echo "Usage:-"
	@echo "\tmake all   -- [default] builds the litmus containers"
	@echo ""

.PHONY: deps
deps: _build_check_docker

_build_check_docker:
	@echo "------------------"
	@echo "--> Check the Docker deps" 
	@echo "------------------"
	@if [ $(IS_DOCKER_INSTALLED) -eq 1 ]; \
		then echo "" \
		&& echo "ERROR:\tdocker is not installed. Please install it before build." \
		&& echo "" \
		&& exit 1; \
		fi;

.PHONY: build
build: litmus-portal-build

litmus-portal-build:
	@echo "------------------"
	@echo "--> Build Graphql images" 
	@echo "------------------"
	docker build ./backend/graphql-server -f backend/graphql-server/build/Dockerfile -t $(REPONAME)/$(GRAPHQL_SERVER_IMAGE):$(IMGTAG)

.PHONY: push
push: litmus-portal-push

litmus-portal-push:
	@echo "------------------"
	@echo "--> Push Graphql images" 
	@echo "------------------"
	REPONAME=$(REPONAME) IMGNAME=$(GRAPHQL_SERVER_IMAGE) IMGTAG=$(IMGTAG) ../hack/push
	




