export interface BasicRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
}

export interface RegisterFormData extends BasicRegisterFormData {
  insuranceProvider: string;
}

export interface DoctorRegisterFormData extends BasicRegisterFormData {
  specialization: string;
  licenseNumber: string;
  hospital: string;
  yearsOfExperience: string;
}

export type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;