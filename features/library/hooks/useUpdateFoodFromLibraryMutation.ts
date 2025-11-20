import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foodLibraryApi } from "../api/api";
import { toast } from "sonner";
import { ProductFormData } from "../types/library";

export const useUpdateFoodFromLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) =>
      foodLibraryApi.updateFoodFromLibrary({ id, data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [foodLibraryApi.baseKey],
      });

      toast.success("Продукт обновлен успешно!", {
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

    onError: (error) => {
      console.error("Delete error:", error);
      toast.error("Не удалось обновить продукт", {
        duration: 4000,
        icon: "❌",
        style: {
          background: "#dc2626",
          color: "white",
          fontWeight: "bold",
          borderRadius: "16px",
        },
      });
    },
  });
};
