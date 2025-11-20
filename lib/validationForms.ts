// lib/validations.ts

export interface ValidationResult {
  error: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { error: "Введите эл. почту" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Введите корректный адрес эл. почты" };
  }
  return { error: "" };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { error: "Введите пароль" };
  }
  if (password.length < 6) {
    return { error: "Пароль должен содержать минимум 6 символов" };
  }
  return { error: "" };
};

export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { error: "Подтвердите пароль" };
  }
  if (password !== confirmPassword) {
    return { error: "Пароли не совпадают" };
  }
  return { error: "" };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { error: "Введите имя" };
  }
  if (name.length < 2) {
    return { error: "Имя должно содержать минимум 2 символа" };
  }
  return { error: "" };
};