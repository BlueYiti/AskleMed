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
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
        <div className="px-8 py-10">
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