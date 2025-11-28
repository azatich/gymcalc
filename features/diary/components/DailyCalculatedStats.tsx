"use client";

import { useProfileQuery } from "@/features/profile/hooks/useProfileQuery";
import { applyGoalToCalories, calculateBMR, calculateTDEE } from "@/features/profile/lib/calculations";
import { useMemo } from "react";
import { CALORIES_PER_GRAM_CARB, CALORIES_PER_GRAM_FAT, CALORIES_PER_GRAM_PROTEIN, FAT_PER_KG, PROTEIN_PER_KG } from "../constants";
import { MealApiResponse } from "@/features/meals/types";
import { NutrientSummary } from "../types";

interface DailyCalculatedStatsProps {
  foods?: MealApiResponse[];
}

const DailyCalculatedStats = ({ foods }: DailyCalculatedStatsProps) => {
  const { data: userProfileData } = useProfileQuery();

  // Мемоизация вычисления общих съеденных питательных веществ (один проход)
  const totalEaten = useMemo<NutrientSummary>(() => {
    if (!foods || foods.length === 0) {
      return { calories: 0, proteins: 0, fats: 0, carbs: 0 };
    }

    const totals = foods.reduce(
      (acc, food) => ({
        calories: acc.calories + (food.calories || 0),
        proteins: acc.proteins + (food.proteins || 0),
        fats: acc.fats + (food.fats || 0),
        carbs: acc.carbs + (food.carbs || 0),
      }),
      { calories: 0, proteins: 0, fats: 0, carbs: 0 }
    );

    return {
      calories: parseFloat(totals.calories.toFixed(1)),
      proteins: parseFloat(totals.proteins.toFixed(1)),
      fats: parseFloat(totals.fats.toFixed(1)),
      carbs: parseFloat(totals.carbs.toFixed(1)),
    };
  }, [foods]);

  // Мемоизация вычисления ежедневных целей
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

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg sticky bottom-24 md:bottom-6">
      <h2 className="text-2xl mb-6">Итого за день</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="text-sm text-indigo-200 mb-1">Калории</div>
          <div className="text-3xl mb-1">{totalEaten.calories} ккал</div>
          <div className="text-sm text-indigo-200">
            из {dailyGoals.calories} ккал
          </div>
        </div>
        <div>
          <div className="text-sm text-indigo-200 mb-1">Белки</div>
          <div className="text-3xl mb-1">{totalEaten.proteins}г</div>
          <div className="text-sm text-indigo-200">
            из {dailyGoals.proteins}г
          </div>
        </div>
        <div>
          <div className="text-sm text-indigo-200 mb-1">Жиры</div>
          <div className="text-3xl mb-1">{totalEaten.fats}г</div>
          <div className="text-sm text-indigo-200">из {dailyGoals.fats}г</div>
        </div>
        <div>
          <div className="text-sm text-indigo-200 mb-1">Углеводы</div>
          <div className="text-3xl mb-1">{totalEaten.carbs}г</div>
          <div className="text-sm text-indigo-200">из {dailyGoals.carbs}г</div>
        </div>
      </div>
    </div>
  );
};

export default DailyCalculatedStats;
