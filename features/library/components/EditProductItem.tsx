"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2 } from "lucide-react";
import { Product, ProductFormData } from "../types";
import { useUpdateFoodLibraryMutation } from "../hooks/useUpdateFoodLibraryMutation";
import { useFoodCategoryQuery } from "@/features/food_category/hooks/useFoodCategoryQuery";

const EditProductItem = ({ product }: { product: Product }) => {
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const updateFoodFromLib = useUpdateFoodLibraryMutation();
  const { data: foodCategories } = useFoodCategoryQuery();

  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    category_id: product.category_id,
    portion: product.portion,
    calories: product.calories_per_100g,
    proteins: product.proteins_per_100g,
    fats: product.fat_per_100g,
    carbs: product.carbs_per_100g,
  });

  const handleSubmit = async () => {
    try {
      await updateFoodFromLib.mutateAsync({
        id: product.id,
        data: formData,
      });
      setShowEditProductModal(false);
    } catch (error) {}
  };

  return (
    <Dialog open={showEditProductModal} onOpenChange={setShowEditProductModal}>
      <DialogTrigger asChild>
        <Button
          className="flex-1 h-10 rounded-lg hover:bg-gray-100 border border-gray-400"
          size="sm"
        >
          <Edit2 className="w-4 h-4 mr-1" />
          Изменить
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white border-none max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Изменить продукт</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="modal-name" className="text-base">
              Название продукта
            </Label>
            <Input
              type="text"
              id="modal-name"
              placeholder="Например: Куриная грудка"
              className="h-14 text-lg rounded-xl"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="modal-category" className="text-base">
                Категория
              </Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: value })
                }
              >
                <SelectTrigger className="h-14 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {foodCategories?.map((cat) => (
                    <SelectItem
                      className="hover:bg-black hover:text-white transition-colors duration-200"
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.category_name} {cat.category_emoji}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-serving" className="text-base">
                Порция
              </Label>
              <Input
                type="number"
                step="1"
                min="0"
                id="modal-portion"
                placeholder="Укажите в гр"
                className="h-14 text-lg rounded-xl"
                value={formData.portion}
                onChange={(e) =>
                  setFormData({ ...formData, portion: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modal-calories" className="text-base">
                Калории
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="1"
                  id="modal-calories"
                  placeholder="Укажите в гр"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={formData.calories}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      calories: Number(e.target.value),
                    })
                  }
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ккал
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-proteins" className="text-base">
                Белки
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="1"
                  id="modal-proteins"
                  placeholder="Укажите в гр"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={formData.proteins}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proteins: Number(e.target.value),
                    })
                  }
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  г
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-fats" className="text-base">
                Жиры
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="1"
                  id="modal-fats"
                  placeholder="Укажите в гр"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={formData.fats}
                  onChange={(e) =>
                    setFormData({ ...formData, fats: Number(e.target.value) })
                  }
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  г
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-carbs" className="text-base">
                Углеводы
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="1"
                  id="modal-carbs"
                  placeholder="Укажите в гр"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={formData.carbs}
                  onChange={(e) =>
                    setFormData({ ...formData, carbs: Number(e.target.value) })
                  }
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  г
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditProductModal(false)}
              className="h-14 text-lg rounded-xl"
            >
              Отмена
            </Button>
            <Button
              type="button"
              disabled={updateFoodFromLib.isPending}
              onClick={handleSubmit}
              className="bg-indigo-800 hover:bg-indigo-500 text-white text-lg h-14 rounded-xl shadow-md transition-colors duration-200"
            >
              {updateFoodFromLib.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Сохранить"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductItem;
