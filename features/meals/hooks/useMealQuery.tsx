import { useQuery } from "@tanstack/react-query";
import { mealApi } from "../api/api";
import { MealApiResponse } from "../types";
import { formatDateForAPI } from "@/lib/formatDate";

export const useMealQuery = (selectedDate: Date) => {
  const dateString = formatDateForAPI(selectedDate);

  const offset = -selectedDate.getTimezoneOffset();
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  const sign = offset >= 0 ? "+" : "-";
  const timezoneOffset = `${sign}${hours}:${minutes}`;

  return useQuery<MealApiResponse[]>({
    queryKey: [mealApi.baseKey, dateString],
    queryFn: () => mealApi.getMeals(dateString, timezoneOffset),
    staleTime: 0,
  });
};
