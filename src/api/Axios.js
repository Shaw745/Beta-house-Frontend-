import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://beta-house-backend-c5ix.onrender.com/api", // ✅ include /api
});

export default axiosInstance;
