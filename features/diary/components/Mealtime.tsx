"use client";

import { useMealQuery } from "@/features/meals/hooks/useMealQuery";
import MealItemCard from "./MealItemCard";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { formatDateToRU } from "@/lib/formatDate";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const DailyCalculatedStats = dynamic(() => import("./DailyCalculatedStats"), {
  loading: () => (
    <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg animate-pulse">
      <div className="h-8 bg-indigo-400 rounded-xl w-48 mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-indigo-400 rounded w-20"></div>
            <div className="h-10 bg-indigo-400 rounded w-24"></div>
            <div className="h-4 bg-indigo-400 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false,
});

const Mealtime = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: foods, isPending: isLoadingFoods } = useMealQuery(selectedDate);

  const goToPreviousDate = useCallback(() => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  }, []);

  const goToNextDate = useCallback(() => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  const isToday = useMemo(
    () => new Date().toDateString() === selectedDate.toDateString(),
    [selectedDate]
  );

  const formattedDate = useMemo(
    () => formatDateToRU(selectedDate),
    [selectedDate]
  );

  const mealsCount = useMemo(() => {
    if (!foods) return 0;
    return foods.length;
  }, [foods]);

  const mealsCountText = useMemo(() => {
    if (mealsCount === 0) return null;
    return `${mealsCount} ${mealsCount === 1 ? "запись" : "записей"}`;
  }, [mealsCount]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-4xl mb-4"
        >
          Дневник питания
        </motion.h1>

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
                  <p className="text-lg">{formattedDate}</p>
                </div>
              </div>
              {!isToday && (
                <Button
                  onClick={goToToday}
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

      <DailyCalculatedStats foods={foods} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Приемы пищи</h2>
          {isLoadingFoods ? (
            <span className="w-16 h-4 rounded-xl bg-gray-200 animate-pulse"></span>
          ) : (
            mealsCountText && <span className="text-sm">{mealsCountText}</span>
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
