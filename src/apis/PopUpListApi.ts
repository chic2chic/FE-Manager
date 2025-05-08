import { api } from "@/apis/config/Axios";

export const getPopUpList = async () => {
  const response = await api.get("/popups");
  return response.data;
};

export const deletePopUpList = async (popupId: number) => {
  const response = await api.delete(`/popups/${popupId}`);
  return response.data;
};
