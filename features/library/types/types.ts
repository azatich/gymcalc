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
  category: ProductCategory;
  portion: string;
}

export interface ProductFormData {
  name: string;
  category: ProductCategory;
  portion: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export type ProductCategory =
  | "meat"
  | "poultry"
  | "fish"
  | "seafood"
  | "dairy"
  | "eggs"
  | "grains"
  | "pasta"
  | "bread"
  | "vegetables"
  | "fruits"
  | "nuts"
  | "seeds"
  | "legumes"
  | "oils"
  | "sweets"
  | "beverages"
  | "herbs_spices"
  | "other";

