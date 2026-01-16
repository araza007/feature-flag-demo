export const API_BASE_URL = process.env.API_BASE_URL;

export const SECURE_COOKIE = process.env.NODE_ENV === "production";

// Toggle this on to use the built-in mock API instead of hitting the network.
export const USE_MOCK_API = process.env.USE_MOCK_API === "true";
