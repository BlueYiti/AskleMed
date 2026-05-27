type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength = ({
  password,
}: PasswordStrengthProps) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  return (
    <div className="space-y-1 text-xs text-slate-500">
      <p className={checks.length ? "text-green-600" : ""}>
        • At least 8 characters
      </p>

      <p className={checks.uppercase ? "text-green-600" : ""}>
        • One uppercase letter
      </p>

      <p className={checks.lowercase ? "text-green-600" : ""}>
        • One lowercase letter
      </p>

      <p className={checks.number ? "text-green-600" : ""}>
        • One number
      </p>
    </div>
  );
};

export default PasswordStrength;