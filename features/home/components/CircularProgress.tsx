"use client";

import { Button } from "@/components/ui/button";
import { useDailyGoals } from "@/features/diary/hooks/useDailyGoals";
import { useTotalEaten } from "@/features/diary/hooks/useTotalEaten";
import { useMealQuery } from "@/features/meals/hooks/useMealQuery";
import { Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CircularProgress = () => {
  const { data: foods, isPending: isLoadingFoods } = useMealQuery(new Date());
  const { dailyGoals, isLoading: isLoadingGoals } = useDailyGoals();
  const { totalEaten } = useTotalEaten(foods);

  const size = 280;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress =
    dailyGoals.calories > 0
      ? Math.min((totalEaten.calories / dailyGoals.calories) * 100, 100)
      : 0;
  const offset = circumference - (progress / 100) * circumference;

  const remainingCalories = dailyGoals.calories - totalEaten.calories;
  const isGoalReached = remainingCalories <= 0;

  if (isLoadingGoals || isLoadingFoods) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-1">Сегодня</h2>
        <p className="text-gray-600">Твой прогресс по калориям</p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative inline-flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{once: false}}
              transition={{ duration: 0.6 }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3f51b5" />
                <stop offset="100%" stopColor="#3f51b5" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-900 mb-1">
              {totalEaten.calories}
            </div>
            <div className="text-sm text-gray-500 mb-2">ккал</div>

            {isGoalReached ? (
              <div className="text-sm text-green-600 font-medium">
                🎉 Цель достигнута!
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                осталось{" "}
                <span className="font-semibold text-gray-700">
                  {remainingCalories}
                </span>{" "}
                ккал
              </div>
            )}
          </div>
        </div>

        {/* Progress percentage */}
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold text-indigo-500">
            {Math.round(progress)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">от дневной нормы</span>
        </div>
      </div>

      {/* Add Button */}
      <Button
        onClick={() => (window.location.href = "/meals")}
        className="w-full text-white h-14 text-lg rounded-2xl shadow-md hover:shadow-lg transition-all bg-linear-to-r bg-black hover:bg-black/80 duration-200"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Добавить продукт
      </Button>
    </div>
  );
};

export default CircularProgress;
