import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // picks localhost in dev, Render URL in prod
  withCredentials: true, // keep if backend uses cookies/auth
});

export default API;
