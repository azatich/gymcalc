"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { categories } from "../constants";

interface SearchProductProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableCategories: { value: string; label: string; emoji: string }[];
}

const SearchProduct = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
}: SearchProductProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск продуктов..."
            className="pl-10 h-12 rounded-xl border-gray-200"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-12 w-full md:w-64 rounded-xl border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {availableCategories.map((cat) => (
              <SelectItem
                className="hover:bg-black hover:text-white transition-colors duration-200"
                key={cat.value}
                value={cat.value}
              >
                {cat.emoji} {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchProduct;
