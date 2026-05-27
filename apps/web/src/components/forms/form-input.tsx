import React from "react";

type FormInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  };

const FormInput = ({
  label,
  ...props
}: FormInputProps) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        {...props}
        className="
          mt-2
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
        "
      />
    </label>
  );
};

export default FormInput;