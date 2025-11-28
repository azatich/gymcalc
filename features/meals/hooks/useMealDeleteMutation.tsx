import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mealApi } from "../api/api";
import { toast } from "sonner";

export const useMealDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mealId: string) => mealApi.deleteMeal(mealId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [mealApi.baseKey],
        refetchType: "active",
      });

      toast.success("Прием пищи удален успешно!", {
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
      toast.error("Не удалось удалить прием пищи", {
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
