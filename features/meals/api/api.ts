import { api } from "@/lib/axios";
import { MealFormData } from "../types";
import { get } from "http";

export const mealApi = {
  baseKey: "meal",

  getMeals: async (date: string, timezoneOffset: string) => {
    const params = new URLSearchParams({
      date: date,
      offset: timezoneOffset,
    });
    
    const res = await api.get(`/meal?${params.toString()}`);
    return res.data.data;
  },

  addMeal: async (data: MealFormData) => {
    const res = await api.post("/meal", data);
    return res.data;
  },
};
