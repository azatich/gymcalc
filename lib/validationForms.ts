import { Dispatch, SetStateAction } from "react";

export const validateProductAddForm = <T extends Record<string, any>>(
  formData: T,
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
): boolean => {
  const newErrors: Record<any, string> = {} as Record<any, string>;

  if (!formData.name.trim()) {
    newErrors.name = "Название продукта обязательно";
  }

  if (!formData.category_id) {
    newErrors.category_id = "Категория обязательна";
  }

  if (!formData.portion.trim()) {
    newErrors.portion = "Порция обязательна";
  }

  if (!formData.calories) {
    newErrors.calories = "Калории обьязательны";
  }

  if (!formData.proteins) {
    newErrors.proteins = "Белки обьязательны";
  }
  if (!formData.fats) {
    newErrors.fats = "Жиры обьязательны";
  }

  if (!formData.carbs) {
    newErrors.carbs = "Углеводы обьязательны";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

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

export const validateMealForm = <T extends Record<string, any>>(
  formData: T,
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
): boolean => {
  const newErrors: Record<any, string> = {};

  if (!formData.name || !formData.name.trim()) {
    newErrors.name = "Название блюда обязательно";
  }

  if (!formData.time) {
    newErrors.time = "Время обязательна";
  }

  if (!formData.mealtime || !formData.mealtime.trim()) {
    newErrors.mealtime = "Время приёма пищи обязательно";
  }

  if (!formData.portion.trim() || formData.portion <= 0) {
    newErrors.portion = "Порция обьязательна";
  }

  if (!formData.calories) {
    newErrors.calories = "Калории обязательны";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
