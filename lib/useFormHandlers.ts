import { Dispatch, SetStateAction } from "react";

export function createTextChangeHandler<T extends Record<string, any>>(
  formData: T,
  setFormData: Dispatch<SetStateAction<T>>,
  errors: Record<keyof T, string>,
  setErrors: Dispatch<SetStateAction<Record<keyof T, string>>>
) {
  return (field: keyof T, value: string) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };
}
