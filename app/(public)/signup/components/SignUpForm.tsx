"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "@/lib/auth-actions";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from "@/lib/validationLoginSignupForms";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignInWithGoogleButton from "../../login/components/SignInWithGoogleButton";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const firstName = (form.firstName as any).value;
    const email = (form.email as any).value;
    const password = (form.password as any).value;
    const confirmPassword = (form.confirmPassword as any).value;

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmValidation = validatePasswordConfirmation(
      password,
      confirmPassword
    );
    const nameValidation = validateName(firstName);

    setEmailError(emailValidation.error);
    setPasswordError(passwordValidation.error);
    setConfirmPasswordError(confirmValidation.error);
    setNameError(nameValidation.error);

    if (
      emailValidation.error ||
      passwordValidation.error ||
      confirmValidation.error ||
      nameValidation.error
    )
      return;

    setIsLoading(true);

    const formData = new FormData(form)
    signup(formData)
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Регистрация</CardTitle>
        <CardDescription>
          Введите свои данные чтобы зарегистрироваться
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  name="firstName"
                  onChange={(e) => {
                    setNameError(validateName(e.target.value).error);
                  }}
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-sm">{nameError}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName" className="text-nowrap">
                  Фамилия (необьязательно)
                </Label>
                <Input name="lastName" id="last-name" placeholder="Робинсон" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                name="email"
                onChange={(e) => {
                  setEmailError(validateEmail(e.target.value).error);
                }}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* ПАРОЛЬ  */}
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPasswordError(validatePassword(e.target.value).error);
                  }}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {/* ПОДТВЕРЖДЕНИЕ ПАРОЛЯ  */}
            <div className="grid gap-2">
              <Label htmlFor="password">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) =>
                    setConfirmPasswordError(
                      validatePasswordConfirmation(
                        (
                          document.getElementById(
                            "password"
                          ) as HTMLInputElement
                        ).value,
                        e.target.value
                      ).error
                    )
                  }
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              )}
            </div>
            
            <Button
              formAction={signup}
              type="submit"
              variant="outline"
              className="w-full hover:bg-gray-200 transition-colors duration-200"
            >
              {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
            </Button>

            <div className="flex items-center gap-2">
              <span className="block flex-1 h-px w-5 bg-black"></span>
              <span>или</span>
              <span className="block flex-1 h-px w-5 bg-black"></span>
            </div>

            <SignInWithGoogleButton />
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="underline">
            Войти
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
