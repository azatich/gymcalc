"use client";

import { useMealDeleteMutation } from "@/features/meals/hooks/useMealDeleteMutation";
import { useMealUpdateMutation } from "@/features/meals/hooks/useMealUpdateMutation";
import { Edit2, Loader2, PencilLine, Trash2 } from "lucide-react";
import React, { useState, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MealItemCard = ({
  id,
  name,
  portion,
  calories,
  proteins,
  fats,
  carbs,
  time,
  mealtime,
}: {
  id: string;
  name: string;
  portion: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  time: string;
  mealtime?: string;
}) => {
  const [showEditMealModal, setShowEditMealModal] = useState(false);

  const deleteMeal = useMealDeleteMutation();
  const updateMeal = useMealUpdateMutation();

  const [formData, setFormData] = useState({
    name,
    portion,
    calories,
    proteins,
    fats,
    carbs,
    time,
    mealtime: mealtime || "",
  });

  const handleSubmit = async () => {
    try {
      await updateMeal.mutateAsync({
        id,
        data: formData,
      });
      setShowEditMealModal(false);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleOpenChange = (open: boolean) => {
    setShowEditMealModal(open);
    if (open) {
      // Reset form data to current values when opening the modal
      setFormData({
        name,
        portion,
        calories,
        proteins,
        fats,
        carbs,
        time,
        mealtime: mealtime || "",
      });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="sm:text-lg mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {mealtime && (
                <>
                  <span className="capitalize">{mealtime}</span>
                  <span>•</span>
                </>
              )}
              <span>{portion}г</span>
              {time && (
                <>
                  <span>•</span>
                  <span>{time}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 mr-4">
            <Dialog
              open={showEditMealModal}
              onOpenChange={handleOpenChange}
            >
              <DialogTrigger asChild>
                <Button
                  className="p-2 hover:bg-gray-100 rounded-xl transition"
                >
                  <PencilLine size={18} className="text-gray-600" />
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-white border-none max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Изменить продукт
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="modal-mealtime" className="text-base">
                        Прием пищи
                      </Label>
                      <Select
                        value={formData.mealtime}
                        onValueChange={(value) => {
                          setFormData({ ...formData, mealtime: value });
                        }}
                      >
                        <SelectTrigger className="h-14 text-lg rounded-xl">
                          <SelectValue placeholder="Выберите прием пищи" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem
                            className="hover:text-white hover:bg-black"
                            value="завтрак"
                          >
                            Завтрак
                          </SelectItem>
                          <SelectItem
                            className="hover:text-white hover:bg-black"
                            value="обед"
                          >
                            Обед
                          </SelectItem>
                          <SelectItem
                            className="hover:text-white hover:bg-black"
                            value="ужин"
                          >
                            Ужин
                          </SelectItem>
                          <SelectItem
                            className="hover:text-white hover:bg-black"
                            value="перекус"
                          >
                            Перекус
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-time" className="text-base">
                        Время
                      </Label>
                      <Input
                        type="time"
                        id="modal-time"
                        className="h-14 text-lg rounded-xl"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                      />
                    </div>
                  </div>

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
                          step="1"
                          id="modal-calories"
                          placeholder="0"
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
                          placeholder="0"
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
                          placeholder="0"
                          className="h-14 text-lg rounded-xl pr-16"
                          value={formData.fats}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fats: Number(e.target.value),
                            })
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
                          placeholder="0"
                          className="h-14 text-lg rounded-xl pr-16"
                          value={formData.carbs}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              carbs: Number(e.target.value),
                            })
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
                      onClick={() => setShowEditMealModal(false)}
                      className="h-14 text-lg rounded-xl"
                    >
                      Отмена
                    </Button>
                    <Button
                      type="button"
                      disabled={updateMeal.isPending}
                      onClick={handleSubmit}
                      className="bg-indigo-800 hover:bg-indigo-500 text-white text-lg h-14 rounded-xl shadow-md transition-colors duration-200"
                    >
                      {updateMeal.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Сохранить"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => deleteMeal.mutate(id)}
              disabled={deleteMeal.isPending}
              className="p-2 hover:bg-red-100 rounded-xl transition"
            >
              {deleteMeal.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin text-red-600" />
              ) : (
                <Trash2 size={18} className="text-red-600" />
              )}
            </Button>
          </div>

          <div className="text-right">
            <div className="text-2xl text-primary">{calories}</div>
            <div className="text-xs text-gray-500">ккал</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-indigo-50 rounded-xl p-3 text-center">
            <div className="text-lg text-indigo-600">{proteins}г</div>
            <div className="text-xs text-gray-600 mt-1">Белки</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center">
            <div className="text-lg text-amber-600">{fats}г</div>
            <div className="text-xs text-gray-600 mt-1">Жиры</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <div className="text-lg text-green-600">{carbs}г</div>
            <div className="text-xs text-gray-600 mt-1">Углев.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MealItemCard);
