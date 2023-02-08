export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api"
    : "https://instagram-clone-api-five.vercel.app/api";
