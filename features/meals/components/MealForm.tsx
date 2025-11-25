"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFoodCategoryQuery } from "@/features/food_category/hooks/useFoodCategoryQuery";
import { useFoodLibraryQuery } from "@/features/library/hooks/useFoodLibraryQuery";
import { Product } from "@/features/library/types";
import { Loader2, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { getAvailableCategories } from "@/lib/getAvailableCategories";
import { useMealMutation } from "../hooks/useMealMutation";
import { createTextChangeHandler } from "@/lib/useFormHandlers";
import { validateMealForm } from "@/lib/validationForms";
import SearchInput from "@/components/SearchInput";

const MealForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPortionModal, setShowPortionModal] = useState(false);
  const [portionMultiplier, setPortionMultiplier] = useState("1");
  const [showLibraryDialog, setShowLibraryDialog] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const addMeal = useMealMutation();

  const [formData, setFormData] = useState({
    name: "",
    time: "",
    mealtime: "",
    portion: "",
    calories: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
  });

  const { data: libraryProducts, isLoading: isLoadingLibProducts } =
    useFoodLibraryQuery();
  const { data: foodCategories } = useFoodCategoryQuery();

  const availableCategoriesWithAll = useMemo(
    () => getAvailableCategories(libraryProducts, foodCategories),
    [libraryProducts, foodCategories]
  );

  const filteredLibraryProducts = useMemo(() => {
    if (!libraryProducts) return [];

    return libraryProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category_id === selectedCategory.toLowerCase();

      const matchesQuery =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [libraryProducts, selectedCategory, searchQuery]);

  const handleTextChange = createTextChangeHandler(
    formData,
    setFormData,
    errors,
    setErrors
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setShowLibraryDialog(false);
    setShowPortionModal(true);
  };

  const handleSubmit = () => {
    if (!validateMealForm(formData, setErrors)) return;
    addMeal.mutate(formData);

    setFormData({
      name: "",
      time: "",
      mealtime: "",
      portion: "",
      calories: 0,
      protein: 0,
      fats: 0,
      carbs: 0,
    });
  };

  const handleSelectLibraryProduct = () => {
    if (!selectedProduct) return;

    const multiplier = parseFloat(portionMultiplier || "1");

    setFormData({
      name: selectedProduct.name,
      time: formData.time,
      mealtime: formData.mealtime,
      portion: `${selectedProduct.portion} × ${multiplier}`,
      calories: Math.round(selectedProduct.calories_per_100g * multiplier),
      protein: selectedProduct.proteins_per_100g * multiplier,
      fats: selectedProduct.fat_per_100g * multiplier,
      carbs: selectedProduct.carbs_per_100g * multiplier,
    });

    setShowPortionModal(false);
    setPortionMultiplier("1");
    setSelectedProduct(null);
  };

  return (
    <>
      {isLoadingLibProducts ? (
        <div className="w-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Button
          type="button"
          variant="destructive"
          className="w-full h-16 rounded-2xl border-2 text-lg bg-indigo-800 hover:bg-indigo-500"
          onClick={() => setShowLibraryDialog(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-xl">📚</span>
            </div>
            <div className="text-left text-white">
              <div>Выбрать из моей библиотеки</div>
              <div className="text-sm text-muted-foreground">
                {libraryProducts && libraryProducts.length > 0 && (
                  <>
                    {libraryProducts.length}{" "}
                    {libraryProducts.length === 1
                      ? "продукт"
                      : libraryProducts.length < 5
                      ? "продукта"
                      : "продуктов"}{" "}
                    доступно
                  </>
                )}
              </div>
            </div>
          </div>
        </Button>
      )}

      <form className="space-y-6">
        {/* Time & Meal Type */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meal" className="text-sm">
                Прием пищи
              </Label>
              <Select
                value={formData.mealtime}
                onValueChange={(value) => {
                  handleTextChange("mealtime", value);
                }}
              >
                <SelectTrigger className="h-14 text-lg rounded-xl border-gray-200">
                  <SelectValue placeholder="Выберите прием пищи" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem
                    className="hover:text-white hover:bg-black"
                    value="breakfast"
                  >
                    Завтрак
                  </SelectItem>
                  <SelectItem
                    className="hover:text-white hover:bg-black"
                    value="lunch"
                  >
                    Обед
                  </SelectItem>
                  <SelectItem
                    className="hover:text-white hover:bg-black"
                    value="dinner"
                  >
                    Ужин
                  </SelectItem>
                  <SelectItem
                    className="hover:text-white hover:bg-black"
                    value="snack"
                  >
                    Перекус
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.mealtime && (
                <p className="text-sm text-red-500">{errors.mealtime}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm">
                Время
              </Label>
              <div className="relative">
                <Input
                  type="time"
                  id="time"
                  className="h-14 text-lg rounded-xl border-gray-200 pl-10"
                  value={formData.time}
                  onChange={(e) => {
                    handleTextChange("time", e.target.value);
                  }}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg mb-4">Информация о продукте</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">
                Название продукта
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Например: Куриная грудка"
                className="h-14 text-lg rounded-xl border-gray-200"
                value={formData.name}
                onChange={(e) => handleTextChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="serving" className="text-sm">
                Порция
              </Label>
              <Input
                type="text"
                id="serving"
                placeholder="Например: 100г"
                className="h-14 text-lg rounded-xl border-gray-200"
                value={formData.portion}
                onChange={(e) => handleTextChange("portion", e.target.value)}
              />
              {errors.portion && (
                <p className="text-sm text-red-500">{errors.portion}</p>
              )}
            </div>
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg mb-4">Пищевая ценность</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories" className="text-sm">
                Калории (ккал)
              </Label>
              <Input
                type="number"
                id="calories"
                placeholder="0"
                className="h-14 text-lg rounded-xl border-gray-200"
                value={formData.calories}
                onChange={(e) =>
                  handleTextChange("calories", Number(e.target.value))
                }
              />
              {errors.calories && (
                <p className="text-sm text-red-500">{errors.calories}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein" className="text-sm">
                Белки (г)
              </Label>
              <Input
                type="number"
                id="protein"
                placeholder="0"
                className="h-14 text-lg rounded-xl border-gray-200"
                value={formData.protein}
                onChange={(e) =>
                  handleTextChange("protein", Number(e.target.value))
                }
              />
              {errors.protein && (
                <p className="text-sm text-red-500">{errors.protein}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fats" className="text-sm">
                Жиры (г)
              </Label>
              <Input
                type="number"
                id="fats"
                placeholder="0"
                className="h-14 text-lg rounded-xl border-gray-200"
                value={formData.fats}
                onChange={(e) =>
                  handleTextChange("fats", Number(e.target.value))
                }
              />
              {errors.fats && (
                <p className="text-sm text-red-500">{errors.fats}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs" className="text-sm">
                Углеводы (г)
              </Label>
              <Input
                type="number"
                id="carbs"
                placeholder="0"
                className="h-14 text-lg rounded-xl border-gray-200"
                value={formData.carbs}
                onChange={(e) =>
                  handleTextChange("carbs", Number(e.target.value))
                }
              />
              {errors.carbs && (
                <p className="text-sm text-red-500">{errors.carbs}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="button"
          className="w-full h-14 rounded-xl text-lg bg-indigo-800 hover:bg-indigo-500 text-white transition-colors duration-200"
          size="lg"
          disabled={addMeal.isPending}
          onClick={handleSubmit}
        >
          {addMeal.isPending ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <span className="flex items-center">
              <Plus className="w-5 h-5 mr-2" /> Добавить
            </span>
          )}
        </Button>
      </form>

      {/* Library Dialog */}
      {showLibraryDialog && (
        <Dialog open={showLibraryDialog} onOpenChange={setShowLibraryDialog}>
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="max-w-md p-6 md:p-8 rounded-xl bg-white border-none overflow-hidden"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl">
                Моя библиотека продуктов
              </DialogTitle>
            </DialogHeader>

            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {availableCategoriesWithAll?.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-indigo-800 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{category.category_emoji}</span>
                    <span className="text-sm">{category.category_name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Products List */}
            <ScrollArea className="h-[400px] rounded-t-xl border border-gray-300">
              {filteredLibraryProducts.length > 0 ? (
                <div className="divide-y divide-gray-300">
                  {filteredLibraryProducts.map((product) => {
                    const category = foodCategories?.find(
                      (cat) => cat.id === product.category_id
                    );

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductSelect(product)}
                        className="w-full text-left p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">
                                {category?.category_emoji || "🍽️"}
                              </span>
                              <h3 className="font-medium">{product.name}</h3>
                            </div>
                            <div className="text-sm font-semibold mb-2">
                              {product.portion}
                            </div>
                            <div className="flex gap-3 text-sm">
                              <span>{product.calories_per_100g} ккал</span>
                              <span>Б: {product.proteins_per_100g} г</span>
                              <span>Ж: {product.fat_per_100g} г</span>
                              <span>У: {product.carbs_per_100g} г</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-500">
                    {selectedCategory === "all"
                      ? "Нет продуктов в библиотеке"
                      : "Нет продуктов в этой категории"}
                  </p>
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Portion Modal */}
      {showPortionModal && selectedProduct && (
        <Dialog
          open={showPortionModal}
          onOpenChange={(open) => {
            if (!open) {
              setShowPortionModal(false);
              setPortionMultiplier("1");
              setSelectedProduct(null);
            }
          }}
        >
          <DialogContent className="max-w-md p-6 md:p-8 rounded-xl bg-white border-none">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {foodCategories?.find(
                    (cat) => cat.id === selectedProduct.category_id
                  )?.category_emoji || "🍽️"}
                </span>
                <DialogTitle className="text-2xl font-semibold">
                  Укажите порцию
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-sm text-gray-500">
                Базовая порция: {selectedProduct.portion}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="portionMultiplier" className="text-base">
                  Множитель порции
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0.1"
                  id="portionMultiplier"
                  placeholder="1"
                  className="h-14 text-lg rounded-xl bg-gray-100"
                  value={portionMultiplier}
                  onChange={(e) => setPortionMultiplier(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Например: 1.5 для полуторной порции, 0.5 для половины
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Итого:</span>
                  <span className="font-medium">
                    {selectedProduct.portion} × {portionMultiplier || 1}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Калории:</span>
                    <span className="font-semibold text-primary">
                      {Math.round(
                        selectedProduct.calories_per_100g *
                          parseFloat(portionMultiplier || "1")
                      )}{" "}
                      ккал
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Белки:</span>
                    <span className="font-semibold text-indigo-600">
                      {(
                        selectedProduct.proteins_per_100g *
                        parseFloat(portionMultiplier || "1")
                      ).toFixed(1)}{" "}
                      г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Жиры:</span>
                    <span className="font-semibold text-amber-600">
                      {(
                        selectedProduct.fat_per_100g *
                        parseFloat(portionMultiplier || "1")
                      ).toFixed(1)}{" "}
                      г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Углеводы:</span>
                    <span className="font-semibold text-green-600">
                      {(
                        selectedProduct.carbs_per_100g *
                        parseFloat(portionMultiplier || "1")
                      ).toFixed(1)}{" "}
                      г
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPortionModal(false);
                  setPortionMultiplier("1");
                  setSelectedProduct(null);
                  setShowLibraryDialog(true);
                }}
                className="h-14 text-lg rounded-xl border-gray-300 hover:bg-gray-100"
              >
                Назад
              </Button>
              <Button
                type="button"
                className="bg-black text-white hover:bg-black/80 h-14 text-lg rounded-xl shadow-md"
                onClick={handleSelectLibraryProduct}
              >
                <Plus className="w-5 h-5 mr-2" />
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MealForm;
