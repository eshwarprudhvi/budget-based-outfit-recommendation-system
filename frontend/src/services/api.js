import axios from "axios";

const API = axios.create({
  baseURL: "https://budget-based-outfit-recommendation-system.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");
export const googleLogin = (data) => API.post("/auth/google", data);
export const getRecommendations = (data) => API.post("/recommend", data);

export default API;
