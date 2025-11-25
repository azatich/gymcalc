import { useMutation } from "@tanstack/react-query";
import { MealFormData } from "../types";
import { mealApi } from "../api/api";
import { toast } from "sonner";
import { queryClient } from "@/shared/api/query-client";

export const useMealMutation = () => {
  return useMutation({
    mutationFn: async (data: MealFormData) => mealApi.addMeal(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [mealApi.baseKey],
      });

      toast.success("Прием пищи добавлен успешно!", {
        duration: 2500,
        icon: "✅",
        position: "top-center",
        style: {
          background: "#16a34a",
          color: "white",
          fontWeight: "bold",
          borderRadius: "16px",
        },
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    },

    onError: () =>
      toast.error("Не удалось добавить прием пищи", {
        duration: 4000,
        icon: "❌",
        style: {
          background: "#dc2626",
          color: "white",
          fontWeight: "bold",
          borderRadius: "16px",
        },
      }),
  });
};
