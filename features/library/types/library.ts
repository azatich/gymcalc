export interface Product {
  id: string;
  user_id: string;
  name: string;
  calories_per_100g: string;
  protein_per_100g: string;
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
  protein: string;
  fats: string;
  carbs: string;
}

export type ProductCategory =
  | "meat"
  | "fish"
  | "dairy"
  | "grains"
  | "vegetables"
  | "fruits"
  | "nuts"
  | "other";
