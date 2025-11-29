"use client";

import { useDailyGoals } from "@/features/diary/hooks/useDailyGoals";
import { useTotalEaten } from "@/features/diary/hooks/useTotalEaten";
import { useMealQuery } from "@/features/meals/hooks/useMealQuery";
import { StatCard } from "./StatCard";
import { motion } from "framer-motion";

const MacrosCards = () => {
  const { data: foods, isPending: isLoadingFoods } = useMealQuery(new Date());
  const { dailyGoals, isLoading: isLoadingGoals } = useDailyGoals();
  const { totalEaten } = useTotalEaten(foods);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard
          title="Белки"
          value={totalEaten.proteins}
          max={dailyGoals.proteins}
          unit="г"
          color="bg-indigo-50"
          progress={(totalEaten.proteins / dailyGoals.proteins) * 100}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard
          title="Жиры"
          value={totalEaten.fats}
          max={dailyGoals.fats}
          unit="г"
          color="bg-amber-50"
          progress={(totalEaten.fats / dailyGoals.fats) * 100}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard
          title="Углеводы"
          value={totalEaten.carbs}
          max={dailyGoals.carbs}
          unit="г"
          color="bg-green-50"
          progress={(totalEaten.carbs / dailyGoals.carbs) * 100}
        />
      </motion.div>
    </div>
  );
};

export default MacrosCards;
