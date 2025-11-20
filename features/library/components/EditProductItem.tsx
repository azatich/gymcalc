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
import { categories } from "../constants";
import { Product, ProductCategory } from "../types/library";
import { useUpdateFoodFromLibraryMutation } from "../hooks/useUpdateFoodFromLibraryMutation";

const EditProductItem = ({ product }: {product: Product}) => {
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const updateFoodFromLib = useUpdateFoodFromLibraryMutation()
  
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    portion: product.portion,
    calories: product.calories_per_100g,
    protein: product.protein_per_100g,
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
    } catch (error) {
    }
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
          <DialogTitle className="text-2xl">
            Изменить продукт
          </DialogTitle>
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
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as ProductCategory })
                }
              >
                <SelectTrigger className="h-14 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories
                    .filter((cat) => cat.value !== "all")
                    .map((cat) => (
                      <SelectItem
                        className="hover:bg-black hover:text-white transition-colors duration-200"
                        key={cat.value}
                        value={cat.value}
                      >
                        {cat.emoji} {cat.label}
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
                type="text"
                id="modal-serving"
                placeholder="100г"
                className="h-14 text-lg rounded-xl"
                value={formData.portion}
                onChange={(e) =>
                  setFormData({ ...formData, portion: e.target.value })
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
                  step="0.1"
                  id="modal-calories"
                  placeholder="0"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={String(formData.calories)}
                  onChange={(e) =>
                    setFormData({ ...formData, calories: String(e.target.value) })
                  }
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ккал
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-protein" className="text-base">
                Белки
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  id="modal-protein"
                  placeholder="0"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={String(formData.protein)}
                  onChange={(e) =>
                    setFormData({ ...formData, protein: String(e.target.value) })
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
                  step="0.1"
                  id="modal-fats"
                  placeholder="0"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={String(formData.fats)}
                  onChange={(e) =>
                    setFormData({ ...formData, fats: String(e.target.value) })
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
                  step="0.1"
                  id="modal-carbs"
                  placeholder="0"
                  className="h-14 text-lg rounded-xl pr-16"
                  value={String(formData.carbs)}
                  onChange={(e) =>
                    setFormData({ ...formData, carbs: String(e.target.value) })
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
              className="bg-black text-white text-lg h-14 rounded-xl shadow-md hover:bg-black/80 transition-colors duration-300 disabled:bg-black/80"
            >
              {updateFoodFromLib.isPending ? <Loader2 className="animate-spin" />: 'Сохранить'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductItem;
