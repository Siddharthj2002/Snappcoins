import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.GENERAL_MODULE_URL}/api`,
});

export default api;