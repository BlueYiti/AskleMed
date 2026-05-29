type Props = {
  value: any;
  onChange: (val: any) => void;
};

export default function HealthInfoSection({ value }: Props) {
  const conditions = value?.conditions || [];
  const medications = value?.medications || [];
  const allergies = value?.allergies || [];

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Health Information</h2>
        <p className="text-sm text-gray-500">
          Medical history summary used for clinical assessment
        </p>
      </div>

      {/* CONDITIONS */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">
          Conditions
        </h3>

        {conditions.length === 0 ? (
          <p className="text-sm text-gray-400">No conditions listed</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {conditions.map((c: string, i: number) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* MEDICATIONS */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">
          Medications
        </h3>

        {medications.length === 0 ? (
          <p className="text-sm text-gray-400">No medications listed</p>
        ) : (
          <div className="space-y-2">
            {medications.map((m: any, i: number) => (
              <div
                key={i}
                className="rounded-lg border bg-gray-50 p-3 text-sm"
              >
                <p className="font-medium">{m.name}</p>
                <p className="text-gray-500">
                  {m.dose || "No dose"} • {m.frequency || "No frequency"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALLERGIES */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">
          Allergies
        </h3>

        {allergies.length === 0 ? (
          <p className="text-sm text-gray-400">No allergies listed</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {allergies.map((a: any, i: number) => (
              <span
                key={i}
                className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-600"
              >
                {a.allergen}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}