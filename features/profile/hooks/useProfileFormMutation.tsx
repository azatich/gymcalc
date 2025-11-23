import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../api/api";
import { toast } from "sonner";
import { ProfileFormData } from "../types";

export const useProfileFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: ProfileFormData }) =>
      profileApi.updateProfile({ data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [profileApi.baseKey],
      });

      toast.success("Профайл обновлен успешно!", {
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
  });
};
