import React from "react";

type FormInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    rightIcon?: React.ReactNode;
  };

const FormInput = ({ label, rightIcon, ...props }: FormInputProps) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="relative mt-2">
        <input
          {...props}
          className="
            block
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-slate-50
            px-4
            py-3
            text-slate-900
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            disabled:cursor-not-allowed
            disabled:opacity-50
            pr-3
          "
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    </label>
  );
};

export default FormInput;