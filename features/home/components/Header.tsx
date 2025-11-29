"use client";

import { formatDateToWeekDayMonthRU } from "@/lib/formatDate";
import { motion } from "framer-motion";

const Header = () => {
  const today = new Date();

  return (
    <div className="mb-8">
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-4xl mb-2"
      >
        Главная
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="text-lg text-gray-600"
      >
        {formatDateToWeekDayMonthRU(today)}
      </motion.p>
    </div>
  );
};

export default Header;
