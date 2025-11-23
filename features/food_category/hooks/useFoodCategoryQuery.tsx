import { foodLibraryApi } from "@/features/library/api/api"
import { useQuery } from "@tanstack/react-query"
import { food_category } from "../api/api"
import { FoodCategory } from "../types"

export const useFoodCategoryQuery = () => {
    return useQuery<FoodCategory[]>({
        queryKey: [food_category.baseKey],
        queryFn: () => food_category.getFoodCategories(),
    })
}