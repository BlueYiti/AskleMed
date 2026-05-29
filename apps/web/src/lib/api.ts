const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProfile = async () => {
  const res = await fetch(`${API_URL}/patient-profile`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load profile");

  return res.json();
};

export const updateProfile = async (data: any) => {
  const res = await fetch(`${API_URL}/patient-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update profile");

  return res.json();
};