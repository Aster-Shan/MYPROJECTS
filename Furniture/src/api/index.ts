import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/lgoin";
      window.location.href = `/lgoin?redirect =${encodeURIComponent(window.location.pathname)}`; //redirect
    }
    return Promise.reject(error);
  }
);
export default api;
