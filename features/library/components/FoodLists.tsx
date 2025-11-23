"use client";

import { useMemo } from "react";
import FoodListsSkeleton from "./FoodListsSkeleton";
import EditProductItem from "./EditProductItem";
import { ProductListsProps } from "../types";
import DeleteProductItem from "./DeleteProductItem";
import { useFoodCategoryQuery } from "@/features/food_category/hooks/useFoodCategoryQuery";

const ProductLists = ({
  searchQuery,
  selectedCategory,
  data,
  isLoading,
}: ProductListsProps) => {

  const { data: foodCategories} = useFoodCategoryQuery()

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category_id === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [data, searchQuery, selectedCategory]);

  if (isLoading) {
    return <FoodListsSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Нет продуктов в библиотеке
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">Продукты не найдены</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredData.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">
                  {foodCategories?.map((category) => category.id === product.category_id && category.category_emoji)}
                </span>
                <h3 className="text-lg">{product.name}</h3>
              </div>
              <div className="text-sm text-gray-500">
                {foodCategories?.map((category) => category.id === product.category_id && category.category_name)}
                • {product.portion}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-primary">
                {product.calories_per_100g}
              </div>
              <div className="text-xs text-gray-500">ккал</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-indigo-50 rounded-lg p-2 text-center">
              <div className="text-base text-indigo-600">
                {product.proteins_per_100g}г
              </div>
              <div className="text-xs text-gray-600">Б</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 text-center">
              <div className="text-base text-amber-600">
                {product.fat_per_100g}г
              </div>
              <div className="text-xs text-gray-600">Ж</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2 text-center">
              <div className="text-base text-green-600">
                {product.carbs_per_100g}г
              </div>
              <div className="text-xs text-gray-600">У</div>
            </div>
          </div>

          <div className="flex gap-2">
            <EditProductItem product={product} />
            <DeleteProductItem id={product.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductLists;
