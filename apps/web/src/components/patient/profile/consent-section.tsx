type Props = {
  value: any;
  onChange: (val: any) => void;
};

export default function ConsentSection({ value, onChange }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Consent</h2>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value?.telehealthConsent || false}
          onChange={(e) =>
            onChange({
              ...value,
              telehealthConsent: e.target.checked,
            })
          }
        />
        Telehealth Consent
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value?.privacyAccepted || false}
          onChange={(e) =>
            onChange({
              ...value,
              privacyAccepted: e.target.checked,
            })
          }
        />
        Privacy Policy Agreement
      </label>

      <input
        className="input"
        placeholder="Electronic Signature"
        value={value?.electronicSignature || ""}
        onChange={(e) =>
          onChange({
            ...value,
            electronicSignature: e.target.value,
          })
        }
      />
    </section>
  );
}