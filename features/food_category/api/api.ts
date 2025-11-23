import { api } from "@/lib/axios"

export const food_category = {
    baseKey: 'food-category',

    getFoodCategories: async () => {
        const res = await api.get('/category')
        return res.data.data;
    }
}