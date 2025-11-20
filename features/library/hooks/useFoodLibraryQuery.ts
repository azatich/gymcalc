import { useQuery } from "@tanstack/react-query";
import { foodLibraryApi } from "../api/api";
import { Product } from "../types/library";

export const useFoodLibraryQuery = () => {

  return useQuery<Product[]>({
    queryKey: [foodLibraryApi.baseKey],
    queryFn: () => foodLibraryApi.getAllFoodsFromLibrary(),
  });
};
