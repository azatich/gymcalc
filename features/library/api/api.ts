import { api } from "@/lib/axios"

export const foodLibraryApi = {
    baseKey: 'foods-library',

    addFoodToLibrary: async (food: any) => {
        const res = await api.post('/library/add', food);
        return res.data;
    },

    getAllFoodsFromLibrary: async () => {
        const res = await api.get('/library/get');
        return res.data.data;
    },

    deleteFoodFromLibrary: async (id: string) => {
        const res = await api.delete(`/library/delete/${id}`);
        return res.data;
    }
}