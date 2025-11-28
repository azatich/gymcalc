import { Calculator } from "lucide-react";
import { ProfileApiResponse } from "../types";
import {
  applyGoalToCalories,
  calculateBMI,
  calculateBMR,
  calculateTDEE,
} from "../lib/calculations";
import { useState } from "react";
import { Span } from "next/dist/trace";

const CalculatedStats = ({
  userProfileData,
}: {
  userProfileData: ProfileApiResponse;
}) => {
  const { age, weight, height, gender, activity_level, goal } = userProfileData;
  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const dailyCal = calculateTDEE(bmr, activity_level);
  const dailyCalWithGoal = applyGoalToCalories(dailyCal, goal);

  const indexMassBody =
    bmi < 18.5
      ? "Недостаточный"
      : bmi >= 18.5 && bmi < 25
      ? "Нормальный"
      : bmi >= 25 && bmi < 30
      ? "Избыточный"
      : "Ожирение";

  return (
    <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl">Расчетные показатели</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <div className="text-sm text-indigo-200 mb-2">Индекс массы тела</div>
          <div className="text-4xl mb-1">
            {!weight || !height ? (
              <span className="text-lg">
                Введите рост и вес для расчета ИМТ
              </span>
            ) : (
              bmi
            )}
          </div>
          <div className="text-sm text-indigo-200">
            {!weight || !height ? null : indexMassBody}
          </div>
        </div>

        <div>
          <div className="text-sm text-indigo-200 mb-2">БМС (BMR)</div>
          <div className="text-4xl mb-1">
            {!bmr || bmr < 0 ? (
              <span className="text-lg">
                Введите рост и вес для расчета базового метоболизма
              </span>
            ) : (
              bmr
            )}
          </div>
          <div className="text-sm text-indigo-200">ккал/день</div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <div className="text-sm text-indigo-200 mb-2">Дневная норма</div>
          <div className="text-4xl mb-1">
            {activity_level ? (
              goal ? (
                dailyCalWithGoal
              ) : (
                <span className="text-xl">Выберите цель для расчета ккал</span>
              )
            ) : (
              <span className="text-xl">
                Выберите уровень активности для расчета ккал
              </span>
            )}
          </div>
          <div className="text-sm text-indigo-200">
            {userProfileData.goal === "loss" && "для похудения"}
            {userProfileData.goal === "maintain" && "для поддержания"}
            {userProfileData.goal === "gain" && "для набора массы"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatedStats;
