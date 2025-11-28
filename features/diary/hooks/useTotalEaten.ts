import { useMemo } from "react";
import { NutrientSummary } from "../types";
import { MealApiResponse } from "@/features/meals/types";

export const useTotalEaten = (foods: MealApiResponse[] | undefined) => {
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

  return { totalEaten };
};
