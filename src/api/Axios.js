import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://beta-house-backend-c5ix.onrender.com", // backend deployed on Render
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
