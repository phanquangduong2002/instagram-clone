export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api"
    : "https://instagram-clone-api-steel.vercel.app/api";

export const LOCAL_STORAGE_TOKEN_NAME = "access_token";
