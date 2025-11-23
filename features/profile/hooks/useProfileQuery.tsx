import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/api";
import { ProfileApiResponse } from "../types";

export const useProfileQuery = () => {
  return useQuery<ProfileApiResponse | null>({
    queryKey: [profileApi.baseKey],
    queryFn: () => profileApi.getUserProfile(),

    select: (item: any) => {
      if (!item) return null;
      return {
        full_name: item.full_name,
        age: item.age,
        gender: item.gender,
        height: item.height,
        weight: item.weight,
        activity_level: item.activity_level,
        goal: item.goal,
      };
    },
  });
};
