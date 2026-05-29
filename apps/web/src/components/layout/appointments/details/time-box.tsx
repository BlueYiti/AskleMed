export default function TimeBox({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white/10 rounded-xl p-3 text-center">
      <p className="text-2xl font-bold">
        {String(value).padStart(2, "0")}
      </p>
      <p className="text-xs text-blue-100">{label}</p>
    </div>
  );
}