const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =========================
   GET MY DOCTOR PROFILE
========================= */

export const getMyDoctor =
  async () => {
    const res = await fetch(
      `${API_URL}/api/doctors/me`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to load doctor profile"
      );
    }

    return res.json();
  };

/* =========================
   UPDATE DOCTOR PROFILE
========================= */

export const updateDoctor =
  async (data: any) => {
    const res = await fetch(
      `${API_URL}/api/doctors/me`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        credentials: "include",

        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to update doctor profile"
      );
    }

    return res.json();
  };

/* =========================
   GET SINGLE DOCTOR
========================= */

export const getDoctor =
  async (doctorId: string) => {
    const res = await fetch(
      `${API_URL}/api/doctors/${doctorId}`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to load doctor"
      );
    }

    return res.json();
  };

/* =========================
   GET ALL DOCTORS
========================= */

export const getDoctors =
  async ({
    search,
    specialization,
  }: {
    search?: string;
    specialization?: string;
  }) => {
    const params =
      new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (specialization) {
      params.set(
        "specialization",
        specialization
      );
    }

    const res = await fetch(
      `${API_URL}/api/doctors?${params.toString()}`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed to load doctors"
      );
    }

    return res.json();
  };