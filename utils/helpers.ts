export const isDev = process.env.NODE_ENV === "development";

export const ORIGINAL_URL = isDev ? "http://localhost:3000" : "";