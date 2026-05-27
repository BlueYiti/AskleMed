export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
  insuranceProvider: string;
};

export type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;