"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Target, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { ProfileFormData, UserActivityLevel, UserGoal } from "../types";
import { Button } from "@/components/ui/button";
import { createTextChangeHandler } from "@/lib/useFormHandlers";
import { useProfileFormMutation } from "../hooks/useProfileFormMutation";
import { useProfileQuery } from "../hooks/useProfileQuery";
import CalculatedStats from "./CalculatedStats";
import MacrosRecommendation from "./MacrosRecommendation";
import { activityLabels, goalLabels } from "../constants/constants";

const ProfileForm = () => {
  const updateProfile = useProfileFormMutation();
  const { data: userProfileData, isPending: isLoadingUserData } =
    useProfileQuery();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activity_level: "",
    goal: "",
  });
  const [errors, setErrors] = useState<Record<any, string>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLButtonElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const activityLevelRef = useRef<HTMLButtonElement>(null);
  const goalRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (userProfileData) {
      const newFormData = {
        name: userProfileData.full_name || "",
        age: userProfileData.age || 0,
        gender: userProfileData.gender || "",
        height: userProfileData.height || 0,
        weight: userProfileData.weight || 0,
        activity_level: userProfileData.activity_level || "",
        goal: userProfileData.goal || "",
      };
      setFormData(newFormData);
    }
  }, [userProfileData]);

  const handleTextChange = createTextChangeHandler(
    formData,
    setFormData,
    errors,
    setErrors
  );

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обьязательна";
    }

    if (!formData.age) {
      newErrors.age = "Возвраст обьязательно";
    }

    if (!formData.height) {
      newErrors.height = "Рост обьязательно";
    }

    if (!formData.weight) {
      newErrors.weight = "Вес обьязательно";
    }

    if (!formData.activity_level) {
      newErrors.activity_level = "Уровень активности обьязательно";
    }

    if (!formData.goal) {
      newErrors.goal = "Цель обьязательна";
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (!isValid) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (newErrors.name)
            nameRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          else if (newErrors.age)
            ageRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          else if (newErrors.gender)
            genderRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          else if (newErrors.height)
            heightRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          else if (newErrors.weight)
            weightRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          else if (newErrors.activity_level)
            activityLevelRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          else if (newErrors.goal)
            goalRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
        }, 100);
      });

      return;
    }

    try {
      updateProfile.mutate({ data: formData });
    } catch (error) {}
  };

  if (isLoadingUserData) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

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
                ref={nameRef}
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
                    ref={ageRef}
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleTextChange("age", e.target.value)}
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
                  onValueChange={(value) => {
                    if (value) {
                      handleTextChange("gender", value);
                    }
                  }}
                >
                  <SelectTrigger
                    ref={genderRef}
                    className="h-14 text-lg rounded-xl border-gray-200"
                  >
                    <SelectValue placeholder="Выберите пол">
                      {formData.gender === "male" && "Мужской"}
                      {formData.gender === "female" && "Женский"}
                      {!formData.gender && "Выберите пол"}
                    </SelectValue>
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
                    ref={heightRef}
                    type="number"
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleTextChange("height", e.target.value)}
                    placeholder="175"
                    className={`h-14 text-lg rounded-xl border-gray-200 pr-16 ${
                      errors.height ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    min="100"
                    step="0.5"
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
                    ref={weightRef}
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleTextChange("weight", e.target.value)}
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
                onValueChange={(value) => {
                  if (value) {
                    handleTextChange("activity_level", value);
                  }
                }}
              >
                <SelectTrigger
                  ref={activityLevelRef}
                  className="h-14 text-lg rounded-xl border-gray-200"
                >
                  <SelectValue placeholder="Выберите уровень активности">
                    {formData.activity_level
                      ? activityLabels[
                          formData.activity_level as UserActivityLevel
                        ]
                      : "Выберите уровень активности"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="sedentary"
                  >
                    Сидячий образ жизни
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="light"
                  >
                    Легкая активность (1-3 раза в неделю)
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="moderate"
                  >
                    Умеренная активность (3-5 раз в неделю)
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="active"
                  >
                    Высокая активность (6-7 раз в неделю)
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="veryActive"
                  >
                    Очень высокая (2 раза в день)
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.activity_level && (
                <p className="text-sm text-red-500">{errors.activity_level}</p>
              )}
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <Label htmlFor="goal" className="text-base">
                Цель
              </Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => {
                  if (value) {
                    handleTextChange("goal", value);
                  }
                }}
              >
                <SelectTrigger
                  ref={goalRef}
                  className="h-14 text-lg rounded-xl border-gray-200"
                >
                  <SelectValue placeholder="Выберите цель">
                    {formData.goal
                      ? goalLabels[formData.goal as UserGoal]
                      : "Выберите цель"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="loss"
                  >
                    Снижение веса
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="maintain"
                  >
                    Поддержание веса
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-black hover:text-white"
                    value="gain"
                  >
                    Набор массы
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.goal && (
                <p className="text-sm text-red-500">{errors.goal}</p>
              )}
            </div>
          </div>
        </div>

        {userProfileData && (
          <CalculatedStats userProfileData={userProfileData} />
        )}
        {userProfileData && (
          <MacrosRecommendation userProfileData={userProfileData} />
        )}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={updateProfile.isPending}
          className="w-full bg-indigo-800 hover:bg-indigo-500 text-white h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          {updateProfile.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" /> Сохранить
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
