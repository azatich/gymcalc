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
    
    const res = await api.get(`/meals?${params.toString()}`);
    return res.data.data;
  },

  addMeal: async (data: MealFormData) => {
    const res = await api.post("/meals", data);
    return res.data;
  },

  deleteMeal: async (id: string) => {
    const res = await api.delete(`/meals/${id}`);
    return res.data;
  },

  updateMeal: async ({ id, data }: { id: string; data: MealFormData }) => {
    const res = await api.patch(`/meals/${id}`, data);
    return res.data;
  }
};
