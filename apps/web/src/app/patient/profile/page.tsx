"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import { getProfile, updateProfile } from "@/lib/api";

import BasicInfoSection from "@/components/patient/profile/basic-info-section";
import HealthInfoSection from "@/components/patient/profile/health-info-section";
import ConsentSection from "@/components/patient/profile/consent-section";
import ProfileActions from "@/components/patient/profile/profile-actions";

export default function ProfilePage() {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getProfile();

      setForm(
        data || {
          basicInfo: {},
          healthInfo: {
            conditions: [],
            medications: [],
            allergies: [],
          },
          consent: {},
        }
      );

      setLoading(false);
    };

    load();
  }, []);

  const updateSection = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const save = async () => {
    setSaving(true);
    await updateProfile(form);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Patient Profile"
        description="Manage your medical and personal information"
      />

      {/* PROFILE LAYOUT GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoSection
            value={form.basicInfo}
            onChange={(v) => updateSection("basicInfo", v)}
          />

          <HealthInfoSection
            value={form.healthInfo}
            onChange={(v) => updateSection("healthInfo", v)}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <ConsentSection
            value={form.consent}
            onChange={(v) => updateSection("consent", v)}
          />

          {/* SUMMARY CARD */}
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Profile Status</h3>

            <div className="text-sm text-gray-600 space-y-1">
              <p>✔ Basic Info</p>
              <p>✔ Health Info</p>
              <p>✔ Visit Reason</p>
              <p>✔ Consent</p>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY SAVE BAR */}
      <div className="sticky bottom-0 border-t bg-white p-4 shadow-md flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}