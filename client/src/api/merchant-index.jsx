import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.MERCHANT_MODULE_URL}/api`,
});

export default api;