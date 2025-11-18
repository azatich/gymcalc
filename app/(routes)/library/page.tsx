"use client";

import { useState } from "react";
import AddProductLibrary from "@/features/library/components/AddProductLibrary";
import FoodLists from "@/features/library/components/FoodLists";
import SearchProduct from "@/features/library/components/SearchProduct";
import { useFoodLibraryQuery } from "@/features/library/hooks/useFoodLibraryQuery";
import { categories } from "@/features/library/constants";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data, isLoading } = useFoodLibraryQuery();

  let availableCategories =
    data
      ?.map((item) => item.category)
      .filter((cat, idx, arr) => arr.indexOf(cat) === idx)
      .map((cat) => categories.find((c) => c.value === cat)!)
      .filter(Boolean) || [];

  const availableCategoriesWithAll = [...availableCategories, { value: "all", label: "Все категории", emoji: "🍽️" }]
    
  return (
    <div className="space-y-6">
      <AddProductLibrary />
      <SearchProduct
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availableCategories={availableCategoriesWithAll}
      />
      <FoodLists
        data={data}
        isLoading={isLoading}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Library;
