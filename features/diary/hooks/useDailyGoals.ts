import { useProfileQuery } from "@/features/profile/hooks/useProfileQuery";
import {
  applyGoalToCalories,
  calculateBMR,
  calculateTDEE,
} from "@/features/profile/lib/calculations";
import {
  CALORIES_PER_GRAM_CARB,
  CALORIES_PER_GRAM_FAT,
  CALORIES_PER_GRAM_PROTEIN,
  FAT_PER_KG,
  PROTEIN_PER_KG,
} from "../constants";
import { useMemo } from "react";

export const useDailyGoals = () => {
  const { data: userProfileData, isPending } = useProfileQuery();

  const dailyGoals = useMemo(() => {
    const { weight, height, age, gender, goal, activity_level } =
      userProfileData || {};

    if (!weight || !height || !age || !gender || !activity_level || !goal) {
      return {
        calories: 0,
        proteins: 0,
        fats: 0,
        carbs: 0,
      };
    }

    const bmr = calculateBMR(weight, height, age, gender);
    const dailyCal = calculateTDEE(bmr, activity_level);
    const dailyCalWithGoal = applyGoalToCalories(dailyCal, goal);
    const dailyProteins = Math.round(weight * PROTEIN_PER_KG);
    const dailyFats = Math.round(weight * FAT_PER_KG);
    const proteinCalories = dailyProteins * CALORIES_PER_GRAM_PROTEIN;
    const fatCalories = dailyFats * CALORIES_PER_GRAM_FAT;
    const dailyCarbs = Math.round(
      (dailyCalWithGoal - proteinCalories - fatCalories) /
        CALORIES_PER_GRAM_CARB
    );

    return {
      calories: dailyCalWithGoal,
      proteins: dailyProteins,
      fats: dailyFats,
      carbs: dailyCarbs,
    };
  }, [userProfileData]);

  return {
    dailyGoals,
    isLoading: isPending,
    userProfileData
  }
};
