# Server Backend
chatbot backend that answers queries over a news corpus using a Retrieval-Augmented Generation (RAG) pipeline.
## Overview
This is a Node.js backend server built with **TypeScript** and **Express**. It provides a scalable and feature-rich backend for a chatbot application, leveraging Redis, vector databases, AI embeddings, and advanced language processing via LangChain and Gemini API.  

Key features include session management, chat history retrieval, AI embeddings, RSS feed parsing, and integration with multiple APIs for intelligent responses.  

---

## Features

- **Session Management**
  - Create new chat sessions
  - Reset existing sessions
  - Retrieve chat history by session ID
- **Redis Integration**
  - Session storage and caching
  - Fast and efficient retrieval of chat data
- **AI Embeddings**
  - Generate embeddings for chat messages using **Jina** and **Gemini API**
  - Store embeddings in **Qdrant Vector Database** for semantic search
- **Vector Database**
  - Qdrant integration for storing and querying embeddings
  - Fast semantic search and similarity matching
- **LangChain Integration**
  - Chunking and processing of large text data
  - Intelligent handling of context and conversation memory
- **RSS Feed Parsing**
  - Fetch and parse external RSS feeds using `feed-parser`
- **Cron Jobs**
  - Scheduled tasks using `node-cron`
- **CORS and Compression**
  - Cross-origin requests support
  - Response compression for performance
- **Logging**
  - HTTP request logging using `morgan`

---

## Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **Redis** (`ioredis`)
- **Qdrant Vector Database**
- **Jina AI**
- **Gemini API**
- **LangChain**
- **RSS Feed Parser**
- **Axios**
- **Socket.IO** (for real-time communication)
- **UUID** (unique session identifiers)

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd server

# Chatbot Server Backend

## Installation

Install dependencies:

```bash
npm install

##Build the TypeScript code:

npm run build


##Start the server in development mode:

npm run dev


##Or start in production:

npm start

#Environment Variables

##Create a .env file in the root of the project and add the following:

PORT=<your-server-port>

REDIS_HOST=<redis-host>
REDIS_PORT=<redis-port>

CLIENT_URL=<your-client-url>

DATABASE_URL=<your-database-url>

NODE_ENV=development

QDRANT_HOST=<qdrant-host>
QDRANT_API=<qdrant-api-key>

JINA_URL=<jina-embedding-service-url>

GEMINI_API_KEY=<gemini-api-key>

RSS_FEED_URL=<rss-feed-url>

# API Routes & Backend Utilities

## Chat Routes

**Create Session**  
`POST /chat/session`  
Create a new chat session.

**Reset Session**  
`POST /chat/session/reset`  
Reset an existing chat session.

**Get Chat History**  
`GET /chat/history/:sessionId`  
Retrieve chat history for a given session ID.

---

## Middleware & Utilities

- **CORS**: Enables requests from the frontend.  
- **Compression**: Compresses responses to improve performance.  
- **Morgan**: Logs HTTP requests for debugging.  
- **Redis**: Stores session and chat data for fast retrieval.  
- **LangChain**: Handles text chunking and context-aware responses.  
- **Vector Database (Qdrant)**: Stores embeddings and allows semantic searches.  
- **Gemini API & Jina Embeddings**: Provides AI-driven embeddings for messages.  

---

## Usage

Once the server is running, your frontend can interact with it by sending requests to the endpoints defined above.  
Sessions are stored in Redis, and embeddings are managed via Qdrant, Gemini API, and Jina.
