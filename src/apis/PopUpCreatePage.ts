import { PopUpCreateRequest } from "@/types/api/ApiRequestType";
import { api } from "./config/Axios";

export const postPopUpCreate = async (formData: PopUpCreateRequest) => {
  const response = await api.post("/popup", formData);
  return response.data;
};
