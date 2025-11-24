import { api } from "@/lib/axios"
import { MealFormData } from "../types"

export const mealApi = {
    baseKey: 'meal',

    addMeal: async (data: MealFormData) => {
        const res = await api.post('/meal', data)
        return res.data
    }
}