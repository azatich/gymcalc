"use client";

import { useMemo, useState } from "react";
import AddProductItem from "@/features/library/components/AddProductItem";
import ProductLists from "@/features/library/components/FoodLists";
import SearchProduct from "@/features/library/components/SearchProduct";
import { useFoodLibraryQuery } from "@/features/library/hooks/useFoodLibraryQuery";
import { useFoodCategoryQuery } from "@/features/food_category/hooks/useFoodCategoryQuery";
import { getAvailableCategories } from "@/lib/getAvailableCategories";

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
