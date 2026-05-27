// app/login/page.tsx

import AuthCard from "@/components/auth/auth-card";

import LoginForm from "@/components/auth/login-form";

import BackToHomeButton from "@/components/navigation/back-to-home-button";

const LoginPage = () => {
  return (
    <AuthCard
      title="Welcome Back"
      description="
        Sign in to your AskleMed account
        to manage appointments,
        access your medical profile,
        and continue your healthcare journey.
      "
    >
      <BackToHomeButton />

      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;