// lib/getAvailableCategories.ts
import { FoodCategory } from "@/features/food_category/types";
import { Product } from "@/features/library/types";

export const getAvailableCategories = (
  products: Product[] | undefined,
  foodCategories: FoodCategory[] | undefined
) => {

  if (!products?.length || !foodCategories?.length) {
    return [
      { id: "all", category_name: "Все категории", category_emoji: "🍽️" },
    ];
  }

  const categoryMap = new Map(foodCategories.map((cat) => [cat.id, cat]));

  const uniqueCategoryIds = [...new Set(products.map((item) => item.category_id))];

  const availableCategories = uniqueCategoryIds
    .map((catId) => categoryMap.get(catId))
    .filter((cat): cat is FoodCategory => cat !== undefined);

  return [
    { id: "all", category_name: "Все категории", category_emoji: "🍽️" },
    ...availableCategories,
  ];
}

