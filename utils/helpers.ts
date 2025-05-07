export const isDev = process.env.NODE_ENV === "development";

export const ORIGINAL_URL = isDev ? "http://localhost:3000" : "https://coding-hero-ou1u.vercel.app";