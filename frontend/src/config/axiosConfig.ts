import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://top100books-dedzitd50-deprus.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;
