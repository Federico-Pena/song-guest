import { createRequire } from "node:module"; const require = createRequire(import.meta.url);

// backend/src/config/apiConfig.ts
var nodDevEnv = process.env.NODE_ENV === "development";
var PORT = process.env.PORT ?? 1234;
var API_URL = nodDevEnv ? `http://localhost:1234` : "https://song-guest.onrender.com";
var CORS_SETTINGS = {
  origin: [API_URL, "http://localhost:5173"],
  // Allow specific origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
  // credentials: true,
  // optionsSuccessStatus: 200,
  // maxAge: 3600
  // preflightContinue: true,
};
var API_ROUTES = {
  someRoutes: {
    route1: "/api/v1/route1"
  }
};
var apiConfig = {
  API_URL,
  PORT,
  API_ROUTES,
  CORS_SETTINGS
};
export {
  apiConfig
};
