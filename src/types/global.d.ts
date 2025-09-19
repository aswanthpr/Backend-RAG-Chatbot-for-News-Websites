declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;

    REDIS_HOST: string;
    REDIS_PORT: string;

    CLIENT_URL: string;

    DATABASE_URL: string;

    NODE_ENV: string;

    QDRANT_HOST: string;
    QDRANT_API: string;

    JINA_URL: string;
    
    GEMINI_API_KEY: string;

    RSS_FEED_URL: string
  }
}
