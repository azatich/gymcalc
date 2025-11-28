"use client";

import { useMealQuery } from "@/features/meals/hooks/useMealQuery";
import MealItemCard from "./MealItemCard";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { formatDateToRU } from "@/lib/formatDate";

const Mealtime = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: foods, isPending: isLoadingFoods } = useMealQuery(selectedDate);

  console.log(foods);
  

  const goToPreviousDate = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDate = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Дневник питания</h1>

        <div className="flex items-center gap-3">
          <Button
            onClick={goToPreviousDate}
            size="icon"
            className="border border-gray-400 hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-lg">{formatDateToRU(selectedDate)}</p>
                </div>
              </div>
              {!isToday && (
                <Button
                  onClick={() => setSelectedDate(new Date())}
                  variant="outline"
                  className="rounded-xl hover:bg-gray-100"
                >
                  Сегодня
                </Button>
              )}
            </div>
          </div>
          <Button
            onClick={goToNextDate}
            disabled={isToday}
            size="icon"
            className="border border-gray-400 hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Приемы пищи</h2>
          {isLoadingFoods ? (
            <span className="w-16 h-4 rounded-xl bg-gray-200 animate-pulse"></span>
          ) : (
            foods &&
            foods.length > 0 && (
              <span className="text-sm">
                {foods.length} {foods.length === 1 ? "запись" : "записей"}
              </span>
            )
          )}
        </div>

        {isLoadingFoods ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-5 bg-gray-200 rounded-xl w-32"></div>
                  <div className="h-4 bg-gray-200 rounded-xl w-16"></div>
                </div>
                <div className="flex gap-4 mb-3">
                  <div className="h-4 bg-gray-200 rounded-xl w-20"></div>
                  <div className="h-4 bg-gray-200 rounded-xl w-20"></div>
                  <div className="h-4 bg-gray-200 rounded-xl w-20"></div>
                  <div className="h-4 bg-gray-200 rounded-xl w-20"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
                  <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
                  <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : foods && foods.length > 0 ? (
          <div className="space-y-3">
            {foods.map((food) => (
              <MealItemCard
                key={food.id}
                id={food.id}
                name={food.name}
                portion={food.portion}
                calories={food.calories}
                proteins={food.proteins}
                fats={food.fats}
                carbs={food.carbs}
                time={food.time}
                mealtime={food.mealtime}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl mb-2">Нет записей</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mealtime;
