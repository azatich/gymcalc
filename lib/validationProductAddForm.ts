import { Dispatch, SetStateAction } from "react";

export const validateProductAddForm = <T extends Record<string, string>>(
  formData: T,
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
): boolean => {
  const newErrors: Record<string, string> = {} as Record<string, string>;

  if (!formData.name.trim()) {
    newErrors.name = "Название продукта обязательно";
  }

  if (!formData.category) {
    newErrors.category = "Категория обязательна";
  }

  if (!formData.portion.trim()) {
    newErrors.portion = "Порция обязательна";
  }

  if (!formData.calories.trim()) {
    newErrors.calories = "Калории обязательны";
  }

  if (!formData.proteins.trim()) {
    newErrors.proteins = "Белки обязательны";
  }

  if (!formData.fats.trim()) {
    newErrors.fats = "Жиры обязательны";
  }

  if (!formData.carbs.trim()) {
    newErrors.carbs = "Углеводы обязательны";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
