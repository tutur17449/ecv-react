import axios from "axios";

const httpClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("er-t");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
