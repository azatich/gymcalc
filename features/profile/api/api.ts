import { api } from "@/lib/axios";
import { ProfileApiResponse, ProfileFormData } from "../types";

export const profileApi = {
  baseKey: "profile",

  updateProfile: async ({ data }: { data: ProfileFormData }) => {
    const res = await api.patch(`/profile`, data);
    return res.data;
  },

  getUserProfile: async (): Promise<ProfileApiResponse | null> => {
    const res = await api.get("/profile");
    return res.data.data;
  },
};
