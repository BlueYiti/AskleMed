"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import FormInput from "@/components/forms/form-input";
import FormMessage from "@/components/auth/form-message";
import PasswordStrength from "@/components/auth/password-strength";

import {
  FormStatus,
  RegisterFormData,
} from "@/types/auth";

import {
  validateRegisterForm,
} from "@/lib/validations/register";

const initialFormData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  dateOfBirth: "",
  insuranceProvider: "",
};

const RegisterForm = () => {
  const [formData, setFormData] =
    useState(initialFormData);

  const [status, setStatus] =
    useState<FormStatus>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatus(null);

    const validationError =
      validateRegisterForm(formData);

    if (validationError) {
      setStatus({
        type: "error",
        message: validationError,
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const result =
        await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,

          data: {
            phone: formData.phone.replace(/\D/g, ""),
            dateOfBirth:
              formData.dateOfBirth,
            insuranceProvider:
              formData.insuranceProvider,
            role: "patient",
          },
        });

      if (result.error) {
        setStatus({
          type: "error",
          message:
            result.error.message ||
            "Unable to create account.",
        });

        return;
      }

      setStatus({
        type: "success",
        message:
          "Account created successfully. Please verify your email.",
      });

      setFormData(initialFormData);

    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message:
          "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="Full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Jane Doe"
          disabled={isSubmitting}
        />

        <FormInput
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
        />

        <FormInput
          label="Date of birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          autoComplete="bday"
          disabled={isSubmitting}
        />

        <FormInput
          label="Phone number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          placeholder="+63 912 345 6789"
          disabled={isSubmitting}
        />

        <div className="md:col-span-2">
          <FormInput
            label="Insurance provider"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
            placeholder="Optional"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Create a password"
            disabled={isSubmitting}
          />

          <div className="mt-3">
            <PasswordStrength
              password={formData.password}
            />
          </div>
        </div>

        <FormInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          placeholder="Repeat your password"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex
            w-full
            justify-center
            rounded-2xl
            bg-blue-600
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "Creating account..."
            : "Create patient account"}
        </button>

        {status && (
          <FormMessage
            type={status.type}
            message={status.message}
          />
        )}
      </div>
    </form>
  );
};

export default RegisterForm;