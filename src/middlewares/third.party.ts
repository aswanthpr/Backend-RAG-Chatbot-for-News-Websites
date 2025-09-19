import { CorsOptions } from "cors";

//default cors config
export const corsOptions: CorsOptions = {
  origin: "*",
  methods:["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Set-Cookie",
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
export const socketCorsConfig: CorsOptions = {
  origin: process.env?.["CLIENT_URL"] as string,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],

  preflightContinue: false,
  optionsSuccessStatus: 204,
};