# Default target
build: build-ui build-api

# Build Docker image for UI
build-ui:
	@echo "Building Docker image for UI..."
	docker build -t registry.digitalocean.com/codedjen/user-5-ui:latest ./ui
	@echo "UI Docker image built successfully."

# Build Docker image for API
build-api:
	@echo "Building Docker image for API..."
	docker build -t registry.digitalocean.com/codedjen/user-5-api:latest ./api
	@echo "API Docker image built successfully."

# Push Docker images to Docker Hub
push: push-ui push-api

# Push Docker image for UI
push-ui:
	@echo "Pushing Docker image for UI..."
	docker push registry.digitalocean.com/codedjen/user-5-ui:latest
	@echo "UI Docker image pushed successfully."

# Push Docker image for API
push-api:
	@echo "Pushing Docker image for API..."
	docker push registry.digitalocean.com/codedjen/user-5-api:latest
	@echo "API Docker image pushed successfully."
