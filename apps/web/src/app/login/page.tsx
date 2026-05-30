import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";
import BackToHomeButton from "@/components/navigation/back-to-home-button";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-slate-200 p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT SIDE (Branding) */}
        <div className="hidden md:flex flex-col justify-center">
          <Image
            src="/images/logo/site-logo.png"
            alt="AskleMed Logo"
            width={180}
            height={180}
            className="mb-6"
          />

          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Your Health,
            <br />
            <span className="text-sky-600">Simplified</span>
          </h1>

          <p className="mt-4 text-slate-600 max-w-md">
            Access your medical records, manage appointments,
            and stay connected with your healthcare providers
            securely in one place.
          </p>

          <div className="mt-6 text-sm text-slate-500">
            Trusted digital healthcare platform
          </div>
        </div>

        {/* RIGHT SIDE (Login Card) */}
        <AuthCard
          title="Welcome Back"
          description="Sign in to your AskleMed account to continue managing your healthcare journey."
        >
          <div className="mb-4">
            <BackToHomeButton />
          </div>

          <LoginForm />
        </AuthCard>

      </div>
    </main>
  );
};

export default LoginPage;