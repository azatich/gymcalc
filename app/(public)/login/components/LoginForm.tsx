"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-actions";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

import { validateEmail, validatePassword } from "@/lib/validationLoginSignupForms";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const email = (form.email as any).value;
    const password = (form.password as any).value;

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation.error);
    setPasswordError(passwordValidation.error);

    if (emailValidation.error || passwordValidation.error) return;

    setIsLoading(true);
    const formData = new FormData(form);
    login(formData);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Войти</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Эл. почта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => {
                  const result = validateEmail(e.target.value);
                  setEmailError(result.error);
                }}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    const result = validatePassword(e.target.value);
                    setPasswordError(result.error);
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

            {/* Submit */}
            <Button
              type="submit"
              variant="outline"
              formAction={login}
              className="w-full hover:bg-gray-200 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Вход в аккаунт..." : "Войти"}
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
          Нету аккаунта?{" "}
          <Link href="/signup" className="underline">
            Регистрация
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
