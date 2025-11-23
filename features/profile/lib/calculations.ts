import { UserActivityLevel, UserGoal } from "../types";

export function calculateBMI(weight: number, height: number): number {
  const h = height / 100;
  return +(weight / (h * h)).toFixed(1);
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  if (gender === "male") {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }
}

export function calculateTDEE(bmr: number, activity: UserActivityLevel): number {
  const activityMap: Record<UserActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  return Math.round(bmr * activityMap[activity]);
}

export function applyGoalToCalories(tdee: number, goal: UserGoal) {
  switch (goal) {
    case "loss":
      return Math.round(tdee * 0.8); // дефицит 20%
    case "gain":
      return Math.round(tdee * 1.1); // профицит 10%
    case "maintain":
    default:
      return tdee; // без изменений
  }
}

