import { useQuery } from "@tanstack/react-query";
import {
  getAvgPurchase,
  getBestItems,
  getTodayEntrants,
  getTodayReservations,
  getCongestion,
  getQuestionnaire,
  getConversion,
  getVisitor,
} from "@/apis/DashBoardApi";
import { VisitorResponse } from "@/types/api/ApiResponseType";

export const useCongestionApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["congestion", "dashboard"],
    queryFn: async () => {
      const res = await getCongestion();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useAvgPurchaseApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["avgPurchase", "dashboard"],
    queryFn: async () => {
      const res = await getAvgPurchase();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayEntrantsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayEntrants", "dashboard"],
    queryFn: async () => {
      const res = await getTodayEntrants();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayReservationsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todayReservation", "dashboard"],
    queryFn: async () => {
      const res = await getTodayReservations();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useBestItemsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["top3", "dashboard"],
    queryFn: async () => {
      const res = await getBestItems();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useQuestionnaireApi = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["questionnaire", "dashboard"],
    queryFn: async () => {
      const response = await getQuestionnaire();
      return response.data;
    },
  });

  return {
    surveys: data?.surveys,
    totalCount: data?.totalCount,
    isLoading,
    isError,
  };
};

export const useConversionApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["conversion", "dashboard"],
    queryFn: async () => {
      const res = await getConversion();
      return res.data;
    },
  });

  return { data, isError, isLoading };
};

export const useVisitorApi = () => {
  const { data, isLoading, isError } = useQuery<VisitorResponse>({
    queryKey: ["visitor", "dashboard"],
    queryFn: async () => {
      const res = await getVisitor();
      return res.data;
    },
  });
  return { data, isLoading, isError };
};
