import { RegisterFormData } from "@/types/auth";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const phoneRegex = /^9\d{9}$/;

export const validateRegisterForm = (
  formData: RegisterFormData
): string | null => {
  // Full name validation
  if (
    !formData.fullName ||
    formData.fullName.trim().length < 2
  ) {
    return "Full name must be at least 2 characters.";
  }

  // Email validation
  if (!formData.email) {
    return "Email is required.";
  }

  // Date of birth validation
  if (!formData.dateOfBirth) {
    return "Date of birth is required.";
  }

  // Phone validation
  if (!phoneRegex.test(formData.phone)) {
    return (
      "Phone number must start with 9 and contain exactly 10 digits."
    );
  }

  // Password validation
  if (!passwordRegex.test(formData.password)) {
    return (
      "Password must be 8+ characters with upper, lower, and a number."
    );
  }

  // Confirm password validation
  if (
    formData.password !==
    formData.confirmPassword
  ) {
    return "Passwords do not match.";
  }

  return null;
};