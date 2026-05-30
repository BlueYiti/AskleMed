"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Header from "@/components/layout/header";

import { getMyDoctor } from "@/services/doctor.service";

type Doctor = {
  _id: string;

  name: string;
  email: string;
  phone?: string;

  photoUrl?: string;
  bio?: string;

  specialization: string;
  experienceYears?: number;

  isVerified?: boolean;

  consultationTypes?: string[];
  consultationFee?: number;

  calLink?: string;

  clinicName?: string;
  clinicAddress?: string;

  languages?: string[];
};

const ProfilePage = () => {
  const [doctor, setDoctor] =
    useState<Doctor | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);

        const data = await getMyDoctor();

        setDoctor(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load doctor profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <Header
          title="Doctor Profile"
          description="View and manage your professional information"
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Header
          title="Doctor Profile"
          description="View and manage your professional information"
        />

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 shadow-sm">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="space-y-8">
        <Header
          title="Doctor Profile"
          description="View and manage your professional information"
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm text-slate-500">
            No doctor profile found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Header
        title="Doctor Profile"
        description="View and manage your professional information"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT SIDEBAR */}
        <div className="space-y-6">
          {/* PROFILE CARD */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Image
                  src={
                    doctor.photoUrl ||
                    "/images/default-doctor.png"
                  }
                  alt={doctor.name}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                />

                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition hover:bg-slate-50"
                >
                  ✎
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {doctor.name}
                  </h2>

                  {doctor.isVerified && (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-500">
                  {doctor.specialization}
                </p>
              </div>
            </div>
          </div>

          {/* BIO */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Bio
            </h3>

            <p className="text-sm leading-6 text-slate-600">
              {doctor.bio ||
                "No bio added yet."}
            </p>
          </div>

          {/* CONTACT */}
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contact Information
            </h3>

            <Info
              label="Email"
              value={doctor.email}
            />

            <Info
              label="Phone"
              value={doctor.phone}
            />
          </div>

          {/* ACTION BUTTON */}
          <Link href="/doctor/profile/edit">
            <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Edit Profile
            </button>
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6 lg:col-span-2">
          {/* PROFESSIONAL INFO */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-sm font-semibold text-slate-900">
              Professional Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <Info
                label="Specialization"
                value={doctor.specialization}
              />

              <Info
                label="Experience"
                value={`${doctor.experienceYears || 0} years`}
              />

              <Info
                label="Languages"
                value={doctor.languages?.join(
                  ", "
                )}
              />

              <Info
                label="Verification"
                value={
                  doctor.isVerified
                    ? "Verified"
                    : "Pending"
                }
              />
            </div>
          </div>

          {/* CONSULTATION */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-sm font-semibold text-slate-900">
              Consultation
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <Info
                label="Consultation Types"
                value={doctor.consultationTypes?.join(
                  ", "
                )}
              />

              <Info
                label="Consultation Fee"
                value={`₱${doctor.consultationFee || 0}`}
              />

              <Info
                label="Booking Link"
                value={doctor.calLink}
              />
            </div>
          </div>

          {/* CLINIC */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-sm font-semibold text-slate-900">
              Clinic Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <Info
                label="Clinic Name"
                value={doctor.clinicName}
              />

              <Info
                label="Clinic Address"
                value={doctor.clinicAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type InfoProps = {
  label: string;
  value?: string | number;
};

const Info = ({
  label,
  value,
}: InfoProps) => {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 wrap-break-word text-sm font-medium text-slate-900">
        {value || "—"}
      </p>
    </div>
  );
};

export default ProfilePage;