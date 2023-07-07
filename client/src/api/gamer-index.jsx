import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.GAMER_MODULE_URL}/api`,
});

export default api;