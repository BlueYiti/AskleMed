import AuthCard from "@/components/auth/auth-card";

import RegisterForm from "@/components/auth/register-form";

import BackToHomeButton from "@/components/navigation/back-to-home-button";

const RegisterPage = () => {
  return (
    <AuthCard
      title="Register as a Patient"
      description="
        Create your AskleMed account to
        book telehealth appointments,
        manage your medical profile,
        and stay connected with care providers.
      "
    >
      <BackToHomeButton />

      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;