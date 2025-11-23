import { useMutation, useQueryClient } from "@tanstack/react-query";
import { foodLibraryApi } from "../api/api";
import { toast } from "sonner";

type FoodLibrary = {
  name: string;
  calories: string;
  proteins: string;
  carbs: string;
  fats: string;
  category_id: string;
  portion: string;
};

export const useFoodLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (food: FoodLibrary) => foodLibraryApi.addFoodToLibrary(food),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [foodLibraryApi.baseKey],
      });

      toast.success("Продукт добавлен успешно!", {
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
      toast.error("Не удалось добавить продукт", {
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
