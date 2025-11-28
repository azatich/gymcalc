'use client';

import { formatDateToWeekDayMonthRU } from "@/lib/formatDate";

const Header = () => {
  const today = new Date();

  return (
    <div className="mb-8">
      <h1 className="text-4xl mb-2">Главная</h1>
      <p className="text-lg text-gray-600">{formatDateToWeekDayMonthRU(today)}</p>
    </div>
  );
};

export default Header;
