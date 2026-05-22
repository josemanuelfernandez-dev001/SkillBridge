CLUSTER_NAME := skillbridge
NAMESPACE := skillbridge

.PHONY: cluster-up cluster-down deploy-local smoke-test logs-api

cluster-up:
kind create cluster --config infra/k8s/kind-cluster.yaml

cluster-down:
kind delete cluster --name $(CLUSTER_NAME)

deploy-local:
helm upgrade --install api infra/helm/api --namespace $(NAMESPACE) --create-namespace -f infra/helm/api/values.staging.yaml
helm upgrade --install web infra/helm/web --namespace $(NAMESPACE) --create-namespace -f infra/helm/web/values.staging.yaml
helm upgrade --install processor infra/helm/processor --namespace $(NAMESPACE) --create-namespace -f infra/helm/processor/values.staging.yaml

smoke-test:
curl --fail http://localhost:3000/health
curl --fail http://localhost:3001/health
curl --fail http://localhost:8000/health

logs-api:
kubectl logs deployment/api --namespace $(NAMESPACE)
