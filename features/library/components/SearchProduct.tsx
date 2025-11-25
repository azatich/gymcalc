"use client";

import SearchInput from "@/components/SearchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SearchProductProps {
  searchQuery: string;
  onSearchQueryChange: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableCategories: {
    id: string;
    category_name: string;
    category_emoji: string;
  }[];
}

const SearchProduct = ({
  searchQuery,
  onSearchQueryChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
}: SearchProductProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={onSearchQueryChange}
        />
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-12 w-full md:w-64 rounded-xl border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {availableCategories.map((cat) => (
              <SelectItem
                className="hover:bg-black hover:text-white transition-colors duration-200"
                key={cat.id}
                value={cat.id}
              >
                {cat.category_emoji} {cat.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchProduct;
