export type UserActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "veryActive";

export type UserGoal = "loss" | "maintain" | "gain"; 
export type UserGender = 'male' | 'female'

export interface ProfileFormData {
  name: string;
  age: number;
  gender: "male" | "female" | "";
  height: number;
  weight: number;
  activity_level: UserActivityLevel | "";
  goal: UserGoal | "";
}

export interface ProfileApiResponse {
  full_name: string;
  age: number;
  gender: UserGender;
  height: number;
  weight: number;
  activity_level: UserActivityLevel;
  goal: UserGoal;
}
