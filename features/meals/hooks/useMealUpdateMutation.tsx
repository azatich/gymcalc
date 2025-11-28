import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MealFormData } from "../types";
import { mealApi } from "../api/api";
import { toast } from "sonner";

export const useMealUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MealFormData }) =>
      mealApi.updateMeal({ id, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [mealApi.baseKey],
        refetchType: 'active',
      });

      toast.success("Прием пищи обновлен успешно!", {
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
      toast.error("Не удалось обновить прием пищи", {
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

