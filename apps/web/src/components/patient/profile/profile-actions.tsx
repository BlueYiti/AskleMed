type Props = {
  onSave: () => void;
};

export default function ProfileActions({ onSave }: Props) {
  return (
    <div className="pt-4">
      <button
        onClick={onSave}
        className="w-full rounded-xl bg-black px-4 py-3 text-white"
      >
        Save Profile
      </button>
    </div>
  );
}