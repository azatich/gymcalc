import { useQuery } from "@tanstack/react-query";
import { foodLibraryApi } from "../api/api";
import { Product } from "../types";

export const useFoodLibraryQuery = () => {
  return useQuery<Product[]>({
    queryKey: [foodLibraryApi.baseKey],
    queryFn: () => foodLibraryApi.getAllFoodsFromLibrary(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
