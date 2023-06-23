// Note: Service URL, load from .env file
export const service =
  import.meta.env.NODE_ENV === "development"
    ? "https://jsonplaceholder.typicode.com"
    : "https://jsonplaceholder.typicode.com";
