#!/bin/bash

# Create base directories
mkdir -p docker/data/{mongodb,elasticsearch,qdrant,ollama}
mkdir -p docker/logs/{mongodb,elasticsearch,qdrant,nginx}
mkdir -p backend/uploads

# Set permissions for Elasticsearch
sudo chown -R 1000:1000 docker/data/elasticsearch
sudo chmod -R 777 docker/data/elasticsearch
sudo chown -R 1000:1000 docker/logs/elasticsearch
sudo chmod -R 777 docker/logs/elasticsearch

# Set permissions for MongoDB
sudo chown -R 1001:1001 docker/data/mongodb
sudo chmod -R 777 docker/data/mongodb
sudo chown -R 1001:1001 docker/logs/mongodb
sudo chmod -R 777 docker/logs/mongodb

# Set permissions for Qdrant
sudo chmod -R 777 docker/data/qdrant
sudo chmod -R 777 docker/logs/qdrant

# Set permissions for Ollama
sudo chmod -R 777 docker/data/ollama

# Set permissions for uploads directory
sudo chmod -R 777 backend/uploads

# Create .gitignore file
cat << EOF > .gitignore
# Data directories
docker/data/*
!docker/data/.gitkeep

# Log directories
docker/logs/*
!docker/logs/.gitkeep

# Upload directory
backend/uploads/*
!backend/uploads/.gitkeep

# Node modules
node_modules/

# Environment variables
.env

# IDE files
.idea/
.vscode/

# OS files
.DS_Store
Thumbs.db
EOF

# Create empty .gitkeep files to maintain directory structure
touch docker/data/.gitkeep
touch docker/logs/.gitkeep
touch backend/uploads/.gitkeep

echo "Directory structure created and permissions set successfully!"