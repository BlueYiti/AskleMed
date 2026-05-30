"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/layout/header";

import { useDoctorProfile } from "@/hooks/use-doctor-profile";

export default function EditProfilePage() {
  const router = useRouter();

  const {
    doctor,
    loading,
    saveProfile,
  } = useDoctorProfile();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData =
      new FormData(e.currentTarget);

    await saveProfile({
      name: formData.get("name"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
      clinicName:
        formData.get("clinicName"),
      clinicAddress:
        formData.get(
          "clinicAddress"
        ),
      calLink:
        formData.get("calLink"),
    });

    router.push(
      "/doctor/profile"
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <Header
        title="Edit Profile"
        description="Update your professional information"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border bg-white p-6"
      >
        {/* fields */}

        <input
          name="name"
          defaultValue={doctor.name}
        />

        <textarea
          name="bio"
          defaultValue={doctor.bio}
        />

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}