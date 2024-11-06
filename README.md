# hrms



xcode-select --install

Check for Homebrew:
In the Terminal, type the following command and press Enter:
```
brew --version
```

Install Homebrew (if not already installed):
If you don't have Homebrew installed, open Terminal and run:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install MongoDB:
Use Homebrew to install MongoDB by running:
```
brew tap mongodb/brew
brew install mongodb-community
```

Start MongoDB:
To start MongoDB as a background service, run
```
brew services start mongodb-community
```
If you don't want it to run automatically at startup, you can start it manually with:
```
mongod --config /usr/local/etc/mongod.conf
```

Verify installation:
To check if MongoDB is running, you can use
```
brew services list
```

Connect to MongoDB:
To connect to your MongoDB instance, open a new terminal window and run:
```
mongosh
```

Create a database and collection:
In the MongoDB shell, you can create a new database and collection:
```
use employeeDB
db.createCollection("employees")
```

Exit the MongoDB shell:
When you're done, type exit to leave the MongoDB shell.
Stop MongoDB (when needed):
If you started MongoDB as a service, you can stop it with:
```
brew services stop mongodb-community
```

After completing these steps, MongoDB should be installed and running on your Mac. The default port for MongoDB is 27017, so your connection string in the Node.js code should be:
```
const uri = 'mongodb://localhost:27017';
```


-------------------------------------------------------------
Qdrant - Vector Database

Install Docker if you haven't already (https://docs.docker.com/get-docker/)

Run Qdrant using Docker:
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

This will start Qdrant and expose it on port 6333 for HTTP and 6334 for GRPC.

For connecting to DB from nodejs, refer to reference/qdrant.js


--------------------------------------------------------------

# Project Structure

hrms-system/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── src/
│       ├── index.html
│       ├── styles.css
│       └── js/
│           └── app.js
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       │   └── database.js
│       ├── routes/
│       │   ├── upload.routes.js
│       │   ├── search.routes.js
│       │   └── qna.routes.js
│       ├── controllers/
│       │   ├── upload.controller.js
│       │   ├── search.controller.js
│       │   └── qna.controller.js
│       ├── services/
│       │   ├── excel.service.js
│       │   ├── mongodb.service.js
│       │   ├── qdrant.service.js
│       │   ├── elasticsearch.service.js
│       │   └── llama.service.js
│       └── models/
│           └── employee.model.js
└── docker-compose.yml


--------------------------------------------------------------


# Employee Data System Setup Instructions


## Setup Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd employee-data-system
   ```

2. setup directories
```
    # Clone your repository
    git clone <repository-url>
    cd hrms-system

    # Make the setup script executable and run it
    chmod +x setup.sh
    ./setup.sh

    # Copy the .env template
    cp .env.template .env
```

2. Create a .env file in the backend directory:
   ```bash
   cd backend
   touch .env
   ```

3. Add the following environment variables to the .env file:
   ```
   MONGODB_URI=mongodb://mongodb:27017/employeeDB
   ELASTICSEARCH_NODE=http://elasticsearch:9200
   QDRANT_HOST=http://qdrant:6333
   OLLAMA_HOST=http://ollama:11434
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Build and start the containers:
   ```bash
   cd ..
   docker-compose up --build
   ```

## Accessing the Application

1. Frontend Interface:
   - Open your browser and navigate to `http://localhost:8080`
   - You'll see the main interface with options for Upload, Search, and Q&A

2. API Endpoints:
   - Upload Data: POST `http://localhost:3000/api/load-data`
   - Search: GET `http://localhost:3000/api/search?field=EmployeeName&query=John`
   - Q&A: POST `http://localhost:3000/api/ask`

## Initial Setup Verification

1. Check if all services are running:
   ```bash
   docker-compose ps
   ```

2. Verify individual services:
   - MongoDB: `curl http://localhost:27017`
   - Elasticsearch: `curl http://localhost:9200`
   - Qdrant: `curl http://localhost:6333/collections`
   - Ollama: `curl http://localhost:11434/api/tags`

## Troubleshooting

1. If Elasticsearch fails to start:
   ```bash
   # Increase virtual memory for Elasticsearch
   sudo sysctl -w vm.max_map_count=262144
   ```

2. If containers fail to start:
   ```bash
   # Remove all containers and volumes
   docker-compose down -v
   # Rebuild and start
   docker-compose up --build
   ```

3. Checking logs:
   ```bash
   # View logs for all services
   docker-compose logs

   # View logs for specific service
   docker-compose logs backend
   ```

## Development

1. Making changes:
   - Frontend changes: Edit files in `frontend/src`
   - Backend changes: Edit files in `backend/src`
   - Rebuild containers after changes: `docker-compose up --build`

2. Accessing logs:
   ```bash
   # Follow logs in real-time
   docker-compose logs -f
   ```

## Data Management

1. Backup MongoDB data:
   ```bash
   docker exec mongodb mongodump --out /backup
   ```

2. Restore MongoDB data:
   ```bash
   docker exec mongodb mongorestore /backup
   ```

## Security Notes

1. In production:
   - Change default passwords
   - Enable authentication for all services
   - Use HTTPS
   - Set up proper firewalls
   - Regularly update dependencies

## Additional Resources

- MongoDB Documentation: https://docs.mongodb.com/
- Elasticsearch Documentation: https://www.elastic.co/guide/index.html
- Qdrant Documentation: https://qdrant.tech/documentation/
- Ollama Documentation: https://ollama.ai/docs

