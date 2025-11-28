"use client";

import { useProfileQuery } from "@/features/profile/hooks/useProfileQuery";
import { MealApiResponse } from "@/features/meals/types";
import { Divide, Loader2 } from "lucide-react";
import { useDailyGoals } from "../hooks/useDailyGoals";
import { useTotalEaten } from "../hooks/useTotalEaten";

interface DailyCalculatedStatsProps {
  foods?: MealApiResponse[];
}

const DailyCalculatedStats = ({ foods }: DailyCalculatedStatsProps) => {
  const { data: userProfileData, isPending: isLoadingProfileData } =
    useProfileQuery();

  const { dailyGoals } = useDailyGoals();
  const { totalEaten } = useTotalEaten(foods);

  console.log(foods);

  return (
    <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg sticky bottom-24 md:bottom-6">
      <h2 className="text-2xl mb-6">Итого за день</h2>

      {isLoadingProfileData ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : !userProfileData?.weight ||
        !userProfileData?.height ||
        !userProfileData?.age ||
        !userProfileData?.gender ? (
        <p className="text-white">
          Пожалуйста, заполните профиль, чтобы быть в курсе о вашем КБЖУ.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="text-sm text-indigo-200 mb-1">Калории</div>
            <div className="text-xl sm:text-3xl mb-1">
              {totalEaten.calories} ккал
            </div>
            <div className="text-xs sm:text-sm text-indigo-200 mb-2">
              из {dailyGoals.calories} ккал
            </div>
            {totalEaten.calories > dailyGoals.calories ? (
              <span className="text-lg text-balance mb-1">
                Вы достигли предела по калориям 🎉{" "}
              </span>
            ) : (
              <div className="relative w-full h-2 sm:h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r  bg-indigo-300 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      (totalEaten.calories / dailyGoals.calories) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm text-indigo-200 mb-1">Белки</div>
            <div className="text-xl sm:text-3xl mb-1">
              {totalEaten.proteins}г
            </div>
            <div className="text-xs sm:text-sm text-indigo-200 mb-2">
              из {dailyGoals.proteins}г
            </div>
            {totalEaten.proteins > dailyGoals.proteins ? (
              <span className="text-lg text-balance mb-1">
                Вы достигли предела по белкам 🎉
              </span>
            ) : (
              <div className="relative w-full h-2 sm:h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r bg-indigo-300 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      (totalEaten.proteins / dailyGoals.proteins) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm text-indigo-200 mb-1">Жиры</div>
            <div className="text-xl sm:text-3xl mb-1">{totalEaten.fats}г</div>
            <div className="text-xs sm:text-sm text-indigo-200 mb-2">
              из {dailyGoals.fats}г
            </div>
            {totalEaten.fats > dailyGoals.fats ? (
              <span className="text-lg text-balance mb-1">
                Вы достигли предела по жирам 🎉
              </span>
            ) : (
              <div className="relative w-full h-2 sm:h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r bg-indigo-300 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      (totalEaten.fats / dailyGoals.fats) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm text-indigo-200 mb-1">Углеводы</div>
            <div className="text-xl sm:text-3xl mb-1">{totalEaten.carbs}г</div>
            <div className="text-xs sm:text-sm text-indigo-200 mb-2">
              из {dailyGoals.carbs}г
            </div>
            {totalEaten.carbs > dailyGoals.carbs ? (
              <span className="text-lg text-balance mb-1">
                Вы достигли предела по углеводам 🎉
              </span>
            ) : (
              <div className="relative w-full h-2 sm:h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-linear-to-r bg-indigo-300 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(
                      (totalEaten.carbs / dailyGoals.carbs) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCalculatedStats;
