"use client";

import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
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

const AddProductItem = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    portion: "",
    calories: "",
    proteins: "",
    fats: "",
    carbs: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  console.log(errors);

  const addFoodToLibrary = useFoodLibraryMutation();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Название продукта обязательно";
    }

    if (!formData.category) {
      newErrors.category = "Категория обязательна";
    }

    if (!formData.portion.trim()) {
      newErrors.portion = "Порция обязательна";
    }

    if (!formData.calories.trim()) {
      newErrors.calories = "Калории обязательны";
    }

    if (!formData.proteins.trim()) {
      newErrors.proteins = "Белки обязательны";
    }

    if (!formData.fats.trim()) {
      newErrors.fats = "Жиры обязательны";
    }

    if (!formData.carbs.trim()) {
      newErrors.carbs = "Углеводы обязательны";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await addFoodToLibrary.mutateAsync(formData);
      setShowAddModal(false);
      setFormData({
        name: "",
        category: "",
        portion: "",
        calories: "",
        proteins: "",
        fats: "",
        carbs: "",
      });
      setErrors({});
    } catch (error) {}
  };

  const handleTextChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
    // Очищаем ошибку при изменении поля
    if (errors.category) {
      setErrors({ ...errors, category: "" });
    }
  };

  const handleCloseModal = (open: boolean) => {
    setShowAddModal(open);
    if (!open) {
      // Сбрасываем форму и ошибки при закрытии модалки
      setFormData({
        name: "",
        category: "",
        portion: "",
        calories: "",
        proteins: "",
        fats: "",
        carbs: "",
      });
      setErrors({});
    }
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

        <Dialog open={showAddModal} onOpenChange={handleCloseModal}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white flex items-center w-full md:w-auto h-12 px-6 rounded-xl shadow-md hover:bg-black/80 transition-colors duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Добавить продукт
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white border-none max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Добавить продукт</DialogTitle>
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
                  className={`h-14 text-lg rounded-xl ${
                    errors.name ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  value={formData.name}
                  onChange={(e) => handleTextChange("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="modal-category" className="text-base">
                    Категория
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger
                      className={`h-14 rounded-xl ${
                        errors.category
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Выберите категорию" />
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
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-portion" className="text-base">
                    Порция
                  </Label>
                  <Input
                    type="text"
                    id="modal-portion"
                    placeholder="100г"
                    className={`h-14 text-lg rounded-xl ${
                      errors.portion
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    value={formData.portion}
                    onChange={(e) =>
                      handleTextChange("portion", e.target.value)
                    }
                  />
                  {errors.portion && (
                    <p className="text-sm text-red-500">{errors.portion}</p>
                  )}
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
                      min="0"
                      id="modal-calories"
                      placeholder="0"
                      className={`h-14 text-lg rounded-xl pr-16 ${
                        errors.calories
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      value={formData.calories}
                      onChange={(e) =>
                        handleTextChange("calories", e.target.value)
                      }
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ккал
                    </div>
                  </div>
                  {errors.calories && (
                    <p className="text-sm text-red-500">{errors.calories}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-protein" className="text-base">
                    Белки
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      id="modal-protein"
                      placeholder="0"
                      className={`h-14 text-lg rounded-xl pr-16 ${
                        errors.protein
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      value={formData.proteins}
                      onChange={(e) =>
                        handleTextChange("proteins", e.target.value)
                      }
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      г
                    </div>
                  </div>
                  {errors.proteins && (
                    <p className="text-sm text-red-500">{errors.proteins}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-fats" className="text-base">
                    Жиры
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      id="modal-fats"
                      placeholder="0"
                      className={`h-14 text-lg rounded-xl pr-16 ${
                        errors.fats ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      value={formData.fats}
                      onChange={(e) => handleTextChange("fats", e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      г
                    </div>
                  </div>
                  {errors.fats && (
                    <p className="text-sm text-red-500">{errors.fats}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-carbs" className="text-base">
                    Углеводы
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      id="modal-carbs"
                      placeholder="0"
                      className={`h-14 text-lg rounded-xl pr-16 ${
                        errors.carbs
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      value={formData.carbs}
                      onChange={(e) =>
                        handleTextChange("carbs", e.target.value)
                      }
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      г
                    </div>
                  </div>
                  {errors.carbs && (
                    <p className="text-sm text-red-500">{errors.carbs}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCloseModal(false)}
                  className="h-14 text-lg rounded-xl"
                >
                  Отмена
                </Button>
                <Button
                  type="button"
                  disabled={addFoodToLibrary.isPending}
                  onClick={handleSubmit}
                  className="bg-black text-white disabled:bg-black/80 h-14 text-lg rounded-xl shadow-md hover:bg-black/80 transition-colors duration-300"
                >
                  {addFoodToLibrary.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Добавить"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddProductItem;
