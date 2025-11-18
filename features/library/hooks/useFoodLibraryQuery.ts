import { useQuery } from "@tanstack/react-query";
import { foodLibraryApi } from "../api/api";

export interface Food {
  id: string;
  user_id: string;
  name: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  created_at: string;
  updated_at: string;
  category: string;
  portion: string;
};

export const useFoodLibraryQuery = () => {

  return useQuery<Food[]>({
    queryKey: [foodLibraryApi.baseKey],
    queryFn: () => foodLibraryApi.getAllFoodsFromLibrary(),
  });
};
