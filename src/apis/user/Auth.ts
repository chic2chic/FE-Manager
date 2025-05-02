import { api } from "../config/axios";

const refreshAccessToken = async () => {
  return await api.get("/api/auth/refresh");
};

const loginApi = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export { refreshAccessToken, loginApi };
