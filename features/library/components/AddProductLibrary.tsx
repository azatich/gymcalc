"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { categories } from "../constants";
import { useFoodLibraryMutation } from "../hooks/useFoodLibraryMutation";
import { useFoodLibraryQuery } from "../hooks/useFoodLibraryQuery";

const AddProductLibrary = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serving: "",
    calories: "",
    protein: "",
    fats: "",
    carbs: "",
  });

  const handleCancel = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      serving: "",
      calories: "",
      protein: "",
      fats: "",
      carbs: "",
    });
  };

  const addFoodToLibrary = useFoodLibraryMutation();

  const handleSubmit = () => {
    handleCancel();
    addFoodToLibrary.mutate(formData);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Библиотека продуктов</h1>
          <p className="text-lg text-gray-600">
            Создайте свою базу продуктов для быстрого доступа
          </p>
        </div>

        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white flex items-center w-full md:w-auto h-12 px-6 rounded-xl shadow-md hover:bg-black/80 transition-colors duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Добавить продукт
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white border-none max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingProduct ? "Редактировать продукт" : "Добавить продукт"}
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
                      setFormData({ ...formData, category: value })
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
                    value={formData.serving}
                    onChange={(e) =>
                      setFormData({ ...formData, serving: e.target.value })
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
                      value={formData.calories}
                      onChange={(e) =>
                        setFormData({ ...formData, calories: e.target.value })
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
                      value={formData.protein}
                      onChange={(e) =>
                        setFormData({ ...formData, protein: e.target.value })
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
                      value={formData.fats}
                      onChange={(e) =>
                        setFormData({ ...formData, fats: e.target.value })
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
                      value={formData.carbs}
                      onChange={(e) =>
                        setFormData({ ...formData, carbs: e.target.value })
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
                  onClick={handleCancel}
                  className="h-14 text-lg rounded-xl"
                >
                  Отмена
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-black text-white h-14 text-lg rounded-xl shadow-md hover:bg-black/80 transition-colors duration-300"
                >
                  {editingProduct ? "Сохранить" : "Добавить"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddProductLibrary;
