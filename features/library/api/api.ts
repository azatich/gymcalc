import { api } from "@/lib/axios"
import { ProductFormData } from "../types";

export const foodLibraryApi = {
    baseKey: 'foods-library',

    addFoodToLibrary: async (food: any) => {
        const res = await api.post('/library/add', food);
        return res.data;
    },

    getAllFoodsFromLibrary: async () => {
        const res = await api.get('/library');
        return res.data.data;
    },

    deleteFoodFromLibrary: async (id: string) => {
        const res = await api.delete(`/library/${id}`);
        return res.data;
    },

    updateFoodFromLibrary: async ({id, data}: {id: string, data: ProductFormData}) => {
        const res = await api.patch(`/library/${id}`, data)
        return res.data;
    }
}