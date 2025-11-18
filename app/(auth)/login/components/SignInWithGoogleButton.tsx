"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignInWithGoogleButton = () => {
  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    
    if (result.error) {
      console.error("Google sign-in error:", result.error);
      // Опционально: показать ошибку пользователю
      return;
    }
    
    if (result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle /> Войти через Google
    </Button>
  );
};

export default SignInWithGoogleButton;