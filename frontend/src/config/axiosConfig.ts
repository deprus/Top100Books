import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://top100books-backend-deprus.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;
