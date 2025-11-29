export interface Product {
  id: string;
  user_id: string;
  name: string;
  calories_per_100g: number;
  proteins_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  created_at: string;
  updated_at: string;
  category_id: string;
  portion: number;
}

export interface ProductFormData {
  name: string;
  category_id: string;
  portion: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface ProductListsProps {
  searchQuery: string;
  selectedCategory: string;
  data?: Product[];
  isLoading: boolean;
}

export type FormFoodLibrary = {
  name: string;
  calories: string;
  proteins: string;
  carbs: string;
  fats: string;
  category_id: string;
  portion: string;
};
