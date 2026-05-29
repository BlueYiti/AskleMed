import AuthCard from "@/components/auth/auth-card";

import DoctorRegisterForm from "@/components/auth/doctor-register-form";

import BackToHomeButton from "@/components/navigation/back-to-home-button";

const RegisterPage = () => {
  return (
    <AuthCard
      title="Register as a Doctor"
      description="
        Join AskleMed as a healthcare provider to offer telehealth consultations,
        manage patient appointments, and provide quality care remotely.
      "
    >
      <BackToHomeButton />

      <DoctorRegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;