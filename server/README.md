# RS Tandem API

Backend API for the technical interview platform built with NestJS and Prisma.

## Quick Start for Beginners

### Step 1: Start the Database and API Server (Docker)

Before you proceed, you need to install Docker on your machine (I prefer using Docker Desktop).

```bash
# Navigate to the server directory
cd server

# Start PostgreSQL database and the API server
docker compose up -d

# This will download and start:
# - PostgreSQL database
# - The API server (handles requests from the frontend)
```

### Step 2: Install Dependencies

```bash
# Install all the required packages
npm install
```

### Step 3: .env file

Ensure that you have `.env` file. If you're confused with it, just copy everything from `.env.example` into `.env`.

### Step 4: Sync Prisma Client

```bash
# Generate Prisma Client from schema (creates type-safe DB client in node_modules/.prisma/client)
npx prisma generate
```

### Step 5: Start the Development Server

```bash
# Start the API server in development mode
npm run start:dev
```

### Next: Access Your API

- **API Server**: http://localhost:3000/api
- **Database**: PostgreSQL running on port 5432

### Available Commands

```bash
# Development
npm run start:dev          # Start development server with auto-restart
npm run start              # Start production server

# Database
npm run prisma:generate    # Generate TypeScript types
npm run prisma:migrate     # Create and run database migrations
npm run prisma:reset       # Reset database (WARNING: deletes all data!)
npm run prisma:studio      # Open database GUI
```

## Available API Endpoints

### Questions

**Get All Questions**

```bash
http://localhost:3000/api/questions
```

**Create a New Question**

```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "What is a closure in JavaScript?",
    "difficulty": "MEDIUM",
    "topicIds": ["topic-1", "topic-2"]
  }'
```

**Get Questions by Difficulty**

```bash
# Get all easy questions
http://localhost:3000/api/questions/difficulty/easy

# Get all medium questions
http://localhost:3000/api/questions/difficulty/medium

# Get all hard questions
http://localhost:3000/api/questions/difficulty/hard
```

**Get Questions by Topic**

```bash
# Get all questions for a specific topic
http://localhost:3000/api/questions/topic/topic-id
```

**Update a Question**

```bash
curl -X PATCH http://localhost:3000/api/questions/question-id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated question title",
    "difficulty": "hard",
    "topicIds": ["topic-new", "topic-another"]
  }'
```

**Delete a Question**

```bash
curl -X DELETE http://localhost:3000/api/questions/question-id
```

### Topics Management

**Get All Topics**

```bash
http://localhost:3000/api/topics
```

**Create a New Topic**

```bash
curl -X POST http://localhost:3000/api/topics \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript",
    "description": "Questions about JavaScript programming language"
  }'
```

**Get a Specific Topic**

```bash
http://localhost:3000/api/topics/topic-id
```

**Update a Topic**

```bash
curl -X PATCH http://localhost:3000/api/topics/topic-id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Topic Title",
    "description": "Updated description"
  }'
```

**Delete a Topic**

```bash
curl -X DELETE http://localhost:3000/api/topics/topic-id
```

## Troubleshooting

**Database connection issues**

```bash
# Check if PostgreSQL is running
docker ps

# Restart the database
docker compose restart postgres
```

**Prisma migration errors**

```bash
# Reset database and migrations (WARNING: deletes all data!)
npx prisma migrate reset

# Or create a new migration
npx prisma migrate dev --name fix-something
```
