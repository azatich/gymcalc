"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SearchProduct from "@/features/library/components/SearchProduct";
import { useFoodLibraryQuery } from "@/features/library/hooks/useFoodLibraryQuery";
import { useFoodCategoryQuery } from "@/features/food_category/hooks/useFoodCategoryQuery";
import { getAvailableCategories } from "@/lib/getAvailableCategories";
import FoodListsSkeleton from "@/features/library/components/FoodListsSkeleton";

const AddProductItem = dynamic(() => import("@/features/library/components/AddProductItem"), {
  loading: () => (
    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-100 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-xl w-48"></div>
    </div>
  ),
  ssr: false,
});

const ProductLists = dynamic(() => import("@/features/library/components/FoodLists"), {
  loading: () => <FoodListsSkeleton />,
  ssr: false,
});

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data, isLoading } = useFoodLibraryQuery();
  const { data: foodCategories } = useFoodCategoryQuery();

  const availableCategoriesWithAll = useMemo(
    () => getAvailableCategories(data, foodCategories),
    [data, foodCategories]
  );

  return (
    <div className="space-y-6">
      <AddProductItem />
      <SearchProduct
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
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
