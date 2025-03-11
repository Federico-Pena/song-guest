const nodDevEnv = process.env.NODE_ENV === 'development'
const isLocalhost =
  process.env.HOST?.includes('://localhost:') || process.env.HOST === undefined
const protocol = nodDevEnv || isLocalhost ? 'http' : 'https'
const host = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ?? 1234

const API_URL = nodDevEnv
  ? `${protocol}://${host}:${PORT}`
  : 'https://song-guest.onrender.com'
const CORS_SETTINGS = {
  origin: [API_URL, 'http://localhost:5173'], // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
  // credentials: true,
  // optionsSuccessStatus: 200,
  // maxAge: 3600
  // preflightContinue: true,
}
const API_ROUTES = {
  someRoutes: {
    route1: '/api/v1/route1'
  }
}
export const apiConfig = {
  API_URL,
  PORT,
  API_ROUTES,
  CORS_SETTINGS
}
