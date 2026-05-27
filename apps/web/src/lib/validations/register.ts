import { RegisterFormData } from "@/types/auth";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateRegisterForm = (
  formData: RegisterFormData
): string | null => {
  if (
    !passwordRegex.test(formData.password)
  ) {
    return (
      "Password must contain uppercase, lowercase, and a number."
    );
  }

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    return "Passwords do not match.";
  }

  return null;
};