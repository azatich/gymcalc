"use client";

import { useMemo, useState } from "react";
import AddProductItem from "@/features/library/components/AddProductItem";
import ProductLists from "@/features/library/components/FoodLists";
import SearchProduct from "@/features/library/components/SearchProduct";
import { useFoodLibraryQuery } from "@/features/library/hooks/useFoodLibraryQuery";
import { useFoodCategoryQuery } from "@/features/food_category/hooks/useFoodCategoryQuery";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data, isLoading } = useFoodLibraryQuery();
  const { data: foodCategories } = useFoodCategoryQuery();

  const availableCategoriesWithAll = useMemo(() => {
    if (!data || !foodCategories)
      return [
        { id: "all", category_name: "Все категории", category_emoji: "🍽️" },
      ];

    const uniqueCategoryIds = [
      ...new Set(data.map((item) => item.category_id)),
    ];

    const availableCategories = uniqueCategoryIds
      .map((catId) => foodCategories.find((c) => c.id === catId))
      .filter((cat): cat is NonNullable<typeof cat> => cat !== undefined);

    return [
      { id: "all", category_name: "Все категории", category_emoji: "🍽️" },
      ...availableCategories,
    ];
  }, [data, foodCategories]);

  console.log(availableCategoriesWithAll);
  

  return (
    <div className="space-y-6">
      <AddProductItem />
      <SearchProduct
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availableCategories={availableCategoriesWithAll}
      />
      <ProductLists
        data={data}
        isLoading={isLoading}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Library;
