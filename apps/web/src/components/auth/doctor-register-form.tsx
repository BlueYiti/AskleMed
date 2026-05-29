"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FormInput from "@/components/forms/form-input";
import FormMessage from "@/components/auth/form-message";

import {
  FormStatus,
  DoctorRegisterFormData
} from "@/types/auth";

import {
  validateRegisterForm,
} from "@/lib/validations/register";

const initialFormData: DoctorRegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  dateOfBirth: "",

  // Doctor fields
  specialization: "",
  licenseNumber: "",
  hospital: "",
  yearsOfExperience: "",
};

const DoctorRegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] =
    useState(initialFormData);

  const [status, setStatus] =
    useState<FormStatus>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name: formData.fullName,

            email: formData.email,

            password: formData.password,

            phone:
              formData.phone.replace(
                /\D/g,
                ""
              ),

            dateOfBirth:
              formData.dateOfBirth,

            // Doctor data
            specialization:
              formData.specialization,

            licenseNumber:
              formData.licenseNumber,

            hospital:
              formData.hospital,

            yearsOfExperience:
              Number(
                formData.yearsOfExperience
              ),

            role: "doctor",
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            result.error ||
            "Unable to create account.",
        });

        return;
      }

      setStatus({
        type: "success",
        message:
          "Doctor account created successfully. Redirecting to login...",
      });

      setFormData(initialFormData);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
          placeholder="Dr. Jane Doe"
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
          placeholder="doctor@example.com"
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
          maxLength={10}
        />

        <FormInput
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          placeholder="Cardiologist"
          disabled={isSubmitting}
        />

        <FormInput
          label="License number"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          required
          placeholder="LIC-123456"
          disabled={isSubmitting}
          maxLength={7}
        />

        <FormInput
          label="Hospital / Clinic"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          required
          placeholder="St. Luke's Medical Center"
          disabled={isSubmitting}
        />

        <FormInput
          label="Years of experience"
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
          placeholder="10"
          disabled={isSubmitting}
        />

        <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
          <FormInput
            label="Password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Create a password"
            disabled={isSubmitting}
            rightIcon={
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                className="
                  text-gray-500
                  hover:text-gray-700
                "
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>
            }
          />

          <FormInput
            label="Confirm password"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Repeat your password"
            disabled={isSubmitting}
            rightIcon={
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="
                  text-gray-500
                  hover:text-gray-700
                "
              >
                {showConfirmPassword
                  ? "🙈"
                  : "👁️"}
              </button>
            }
          />
        </div>
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
            ? "Creating Doctor Account..."
            : "Create Doctor Account"}
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

export default DoctorRegisterForm;