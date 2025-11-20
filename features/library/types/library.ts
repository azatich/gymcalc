export interface Product {
  id: string;
  user_id: string;
  name: string;
  calories_per_100g: String;
  protein_per_100g: String;
  carbs_per_100g: String;
  fat_per_100g: String;
  created_at: string;
  updated_at: string;
  category: string;
  portion: string;
};


export type ProductCategory =
  | "meat"
  | "fish"
  | "dairy"
  | "grains"
  | "vegetables"
  | "fruits"
  | "nuts"
  | "other";

