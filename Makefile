# Default target
build: build-ui build-api

# Build Docker image for UI
build-ui:
	@export DOCKER_BUILDKIT=1
	@echo "Building Docker image for UI..."
	docker build -t registry.digitalocean.com/codedjen/<NAMESPACE>-ui:latest ./ui --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from registry.digitalocean.com/codedjen/codedjen-app-base-ui:staging
	@echo "UI Docker image built successfully."

# Build Docker image for API
build-api:
	@export DOCKER_BUILDKIT=1
	@echo "Building Docker image for API..."
	docker build -t registry.digitalocean.com/codedjen/<NAMESPACE>-api:latest ./api --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from registry.digitalocean.com/codedjen/codedjen-app-base-api:staging
	@echo "API Docker image built successfully."

# Push Docker images to Docker Hub
push: push-ui push-api

# Push Docker image for UI
push-ui:
	@export DOCKER_BUILDKIT=1
	@echo "Pushing Docker image for UI..."
	docker push registry.digitalocean.com/codedjen/<NAMESPACE>-ui:latest
	@echo "UI Docker image pushed successfully."

# Push Docker image for API
push-api:
	@export DOCKER_BUILDKIT=1
	@echo "Pushing Docker image for API..."
	docker push registry.digitalocean.com/codedjen/<NAMESPACE>-api:latest
	@echo "API Docker image pushed successfully."
