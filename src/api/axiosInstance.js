import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.gotsystems.net/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
