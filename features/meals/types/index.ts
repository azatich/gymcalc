export interface MealFormData {
  name: string;
  time: string;
  mealtime: string;
  portion: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface MealApiResponse {
  id: string;
  user_id: string;
  name: string;
  time: string;
  mealtime: string;
  portion: number;
  calories: 2;
  proteins: 0;
  carbs: 2;
  fats: 2;
  created_at: string;
  updated_at: string;
}
