type Props = {
  value: any;
  onChange: (val: any) => void;
};

export default function BasicInfoSection({ value, onChange }: any) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Basic Information</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="input"
          placeholder="First Name"
          value={value?.firstName || ""}
          onChange={(e) =>
            onChange({ ...value, firstName: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Last Name"
          value={value?.lastName || ""}
          onChange={(e) =>
            onChange({ ...value, lastName: e.target.value })
          }
        />

        <input
          type="date"
          className="input"
          value={value?.dateOfBirth || ""}
          onChange={(e) =>
            onChange({ ...value, dateOfBirth: e.target.value })
          }
        />

        <select
          className="input"
          value={value?.sexAtBirth || "male"}
          onChange={(e) =>
            onChange({ ...value, sexAtBirth: e.target.value })
          }
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
    </section>
  );
}