// utils/dateUtils.ts (или где у тебя утилиты)
export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // "2025-11-25"
};

export const formatDateToRU = (date: Date): string => {
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return "Сегодня";
  }

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Вчера";
  }

  const weekdayRu = date.toLocaleDateString("ru-RU", {
    weekday: "long",
  });

  const dayAndMonthRu = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  return `${weekdayRu}, ${dayAndMonthRu}`;
};
