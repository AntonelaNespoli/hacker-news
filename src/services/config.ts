import axios from "axios";

const BASE_URL = "https://hn.algolia.com/api/v1/";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
