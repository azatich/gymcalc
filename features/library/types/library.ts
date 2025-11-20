export interface Product {
  id: string;
  user_id: string;
  name: string;
  calories_per_100g: string;
  proteins_per_100g: string;
  carbs_per_100g: string;
  fat_per_100g: string;
  created_at: string;
  updated_at: string;
  category: ProductCategory;
  portion: string;
}

export interface ProductFormData {
  name: string;
  category: ProductCategory;
  portion: string;
  calories: string;
  proteins: string;
  fats: string;
  carbs: string;
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

