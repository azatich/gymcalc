import { Dispatch, SetStateAction } from "react";

export const validateProfileForm = <T extends Record<string, any>>(
  formData: T,
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
): boolean => {
  const newErrors: Record<any, string> = {};

  if (!formData.name.trim()) {
    newErrors.name = "Имя обьязательна";
  }

  if (!formData.age) {
    newErrors.age = "Возвраст обьязательно";
  }

  if (!formData.height) {
    newErrors.height = "Рост обьязательно";
  }

  if (!formData.weight) {
    newErrors.weight = "Вес обьязательно";
  }

  if (!formData.activity_level) {
    newErrors.activity_level = "Уровень активности обьязательно";
  }

  if (!formData.goal) {
    newErrors.goal = "Цель обьязательна";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
