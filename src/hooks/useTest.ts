import { api } from "@/apis/axios";

export const useTest = () => {
  const handleTestGet = async () => {
    return await api.get("/auth");
  };

  const handleTestPost = async () => {
    return await api.post("/auth", "테스트 내용");
  };

  return { handleTestGet, handleTestPost };
};
