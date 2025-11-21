"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Target, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "./Header";
import { useState } from "react";
import { ProfileFormData, UserActivityLevel, UserGoal } from "../types/types";
import { Button } from "@/components/ui/button";
import { createTextChangeHandler } from "@/lib/useFormHandlers";
import { validateProfileForm } from "@/lib/validationProfileForm";

const ProfileForm = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    age: 0,
    gender: "male",
    height: 0,
    weight: 0,
    activity_level: "sedentary",
    goal: "loss",
  });
  const [errors, setErrors] = useState<Record<any, string>>({});

  const handleTextChange = createTextChangeHandler(
    formData,
    setFormData,
    errors,
    setErrors
  );

  const handleSubmit = async () => {
    if (!validateProfileForm(formData, setErrors)) {
      return;
    }
    console.log("Submitted form data: ", formData);
  };

  return (
    <div className="space-y-6">
      <Header />

      <form className="space-y-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl">Личные данные</h2>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                Имя
              </Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleTextChange("name", e.target.value)}
                placeholder="Ваше имя"
                className={`h-14 text-lg rounded-xl border-gray-200 ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-base">
                  Возраст
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(e) =>
                      handleTextChange("age", e.target.value)
                    }
                    placeholder="25"
                    className={`h-14 text-lg rounded-xl border-gray-200 pr-20 ${
                      errors.age ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    min="1"
                    max="100"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    лет
                  </div>
                </div>
                {errors.age && (
                  <p className="text-sm text-red-500">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base">
                  Пол
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      gender: (value as "male") || "female",
                    })
                  }
                >
                  <SelectTrigger className="h-14 text-lg rounded-xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      className="hover:bg-black hover:text-white transition-colors"
                      value="male"
                    >
                      Мужской
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-black hover:text-white transition-colors"
                      value="female"
                    >
                      Женский
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Height and Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-base">
                  Рост
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleTextChange("height", e.target.value) }
                    placeholder="175"
                    className={`h-14 text-lg rounded-xl border-gray-200 pr-16 ${
                      errors.height ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    min="100"
                    step='0.5'
                    max="250"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    см
                  </div>
                </div>
                {errors.height && (
                <p className="text-sm text-red-500">{errors.height}</p>
              )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-base">
                  Вес
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleTextChange('weight', e.target.value)
                    }
                    placeholder="75"
                    className={`h-14 text-lg rounded-xl border-gray-200 pr-16 ${
                      errors.weight ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    min="40"
                    max="200"
                    step="0.1"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    кг
                  </div>
                </div>
                {errors.weight && (
                <p className="text-sm text-red-500">{errors.weight}</p>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Activity & Goals */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl">Активность и цели</h2>
          </div>

          <div className="space-y-5">
            {/* Activity Level */}
            <div className="space-y-2">
              <Label htmlFor="activity" className="text-base">
                Уровень активности
              </Label>
              <Select
                value={formData.activity_level}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    activity_level: value as UserActivityLevel,
                  })
                }
              >
                <SelectTrigger className="h-14 text-lg rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Сидячий образ жизни</SelectItem>
                  <SelectItem value="light">
                    Легкая активность (1-3 раза в неделю)
                  </SelectItem>
                  <SelectItem value="moderate">
                    Умеренная активность (3-5 раз в неделю)
                  </SelectItem>
                  <SelectItem value="active">
                    Высокая активность (6-7 раз в неделю)
                  </SelectItem>
                  <SelectItem value="veryActive">
                    Очень высокая (2 раза в день)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <Label htmlFor="goal" className="text-base">
                Цель
              </Label>
              <Select
                value={formData.goal}
                onValueChange={(value) =>
                  setFormData({ ...formData, goal: value as UserGoal })
                }
              >
                <SelectTrigger className="h-14 text-lg rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loss">Снижение веса</SelectItem>
                  <SelectItem value="maintain">Поддержание веса</SelectItem>
                  <SelectItem value="gain">Набор массы</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="sticky bottom-24 md:bottom-6">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-black text-white    h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
