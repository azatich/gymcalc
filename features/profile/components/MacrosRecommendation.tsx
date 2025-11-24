import { TrendingUp } from "lucide-react";
import {
  applyGoalToCalories,
  calculateBMR,
  calculateTDEE,
} from "../lib/calculations";
import { ProfileApiResponse } from "../types";

const MacrosRecommendation = ({
  userProfileData,
}: {
  userProfileData: ProfileApiResponse;
}) => {
  const { age, weight, height, gender, activity_level, goal } = userProfileData;

  const bmr = calculateBMR(weight, height, age, gender);
  const dailyCal = calculateTDEE(bmr, activity_level);
  const dailyCalWithGoal = applyGoalToCalories(dailyCal, goal);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl">Рекомендации КБЖУ</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-2xl p-5 text-center">
          <div className="text-3xl text-indigo-600 mb-2">
            {weight ? `${Math.round(weight * 2)}г` : "—"}
          </div>
          <div className="text-gray-700 mb-1">Белки</div>
          <div className="text-sm text-gray-600">2г на кг веса</div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 text-center">
          <div className="text-3xl text-amber-600 mb-2">
            {weight ? `${Math.round(weight * 0.8)}г` : "—"}
          </div>
          <div className="text-gray-700 mb-1">Жиры</div>
          <div className="text-sm text-gray-600">0.8г на кг веса</div>
        </div>

        <div className="bg-green-50 rounded-2xl p-5 text-center">
          <div className="text-3xl text-green-600 mb-2">
            {!dailyCalWithGoal || !weight || !height
              ? "—"
              : `${Math.round(
                  (dailyCalWithGoal - (weight * 2 * 4 + weight * 0.8 * 9)) / 4
                )}г`}
          </div>
          <div className="text-gray-700 mb-1">Углеводы</div>
          <div className="text-sm text-gray-600">остаток калорий</div>
        </div>
      </div>
    </div>
  );
};

export default MacrosRecommendation;
