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
import { QUERY_KEYS } from "@/hooks/api/queryKey";

export const useBestItemsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.BESTITEM,
    queryFn: async () => {
      const response = await getBestItems();
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useCongestionApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.CONGESTION,
    queryFn: async () => {
      const response = await getCongestion();
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useVisitorApi = () => {
  const { data, isLoading, isError } = useQuery<VisitorResponse>({
    queryKey: QUERY_KEYS.DASHBOARD.VISITOR,
    queryFn: async () => {
      const response = await getVisitor();
      return response.data;
    },
  });

  return { data, isLoading, isError };
};

export const useTodayReservationsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.TODAY_RESERVATION,
    queryFn: async () => {
      const response = await getTodayReservations();
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useTodayEntrantsApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.TODAY_ENTRANT,
    queryFn: async () => {
      const response = await getTodayEntrants();
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useAvgPurchaseApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.AVG_PURCHASE,
    queryFn: async () => {
      const response = await getAvgPurchase();
      return response.data;
    },
  });

  return { data, isError, isLoading };
};

export const useQuestionnaireApi = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.QUESTIONNAIRE,
    queryFn: async () => {
      const response = await getQuestionnaire();
      return response.data;
    },
  });

  return { data, isLoading, isError };
};

export const useConversionApi = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.CONVERSION,
    queryFn: async () => {
      const response = await getConversion();
      return response.data;
    },
  });

  return { data, isError, isLoading };
};
