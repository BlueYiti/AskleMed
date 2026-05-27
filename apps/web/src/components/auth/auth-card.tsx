import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const AuthCard = ({
  title,
  description,
  children,
}: AuthCardProps) => {
  return (
    <main className="relative min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Solid white layer */}
        <div className="absolute inset-0 bg-white" />

        {/* Content */}
        <div className="relative px-8 py-10">
          <h1 className="text-3xl font-semibold text-slate-900">
            {title}
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            {description}
          </p>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthCard;