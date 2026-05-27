type FormMessageProps = {
  type: "success" | "error";
  message: string;
};

const FormMessage = ({
  type,
  message,
}: FormMessageProps) => {
  return (
    <div
      role="alert"
      className={`
        rounded-xl
        px-4
        py-3
        text-sm
        ${
          type === "error"
            ? "bg-red-50 text-red-600"
            : "bg-green-50 text-green-700"
        }
      `}
    >
      {message}
    </div>
  );
};

export default FormMessage;