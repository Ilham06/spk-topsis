import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});

// can add interceptor here

export default http;
