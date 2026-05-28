export type Doctor = {
  _id: string;
  userId: string; // links to Better Auth user

  // Basic profile
  name: string;
  photoUrl?: string;
  calLink: string; // Cal.com scheduling link

  specialization: DoctorSpecialization;
  experienceYears: number;
  bio?: string;

  // Consultation
  consultationTypes: ConsultationType[];
  consultationFee?: number;

  // Availability (simple MVP model)
  availability: DoctorAvailability;

  // Optional clinic info
  clinicName?: string;
  clinicAddress?: string;

  languages?: string[];

  createdAt?: Date;
  updatedAt?: Date;
};

export const SPECIALIZATIONS = [
  { key: "all", label: "All" },
  { key: "primary_care", label: "Primary Care" },
  { key: "women_health", label: "Women's Health" },
  { key: "mental_health", label: "Mental Health" },
  { key: "dermatology", label: "Dermatology" },
  { key: "cardiology", label: "Cardiology" },
  { key: "neurology", label: "Neurology" },
  { key: "endocrinology", label: "Endocrinology" },
  { key: "gastroenterology", label: "Gastroenterology" },
  { key: "pulmonology", label: "Pulmonology" },
  { key: "orthopedics", label: "Orthopedics" },
  { key: "urology_nephrology", label: "Urology / Nephrology" },
  { key: "ophthalmology", label: "Ophthalmology" },
  { key: "ent", label: "ENT" },
  { key: "infectious_disease", label: "Infectious Disease" },
  { key: "urgent_care", label: "Urgent Care" },
] as const;

export const CONSULTATION_TYPES = [
  { key: "all", label: "All" },
  { key: "online", label: "Online" },
  { key: "in_person", label: "In Person" },
] as const;

export type SpecializationKey =
  typeof SPECIALIZATIONS[number]["key"];

export type ConsultationTypeKey =
  typeof CONSULTATION_TYPES[number]["key"];

export type DoctorSpecialization = Exclude<
  SpecializationKey,
  "all"
>;

export type ConsultationType = Exclude<
  ConsultationTypeKey,
  "all"
>;

export type DoctorAvailability = {
  isAvailableToday: boolean;

  nextSlot?: Date;

  schedule?: {
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";

    startTime: string;
    endTime: string;
  }[];
};

export type DoctorFilters = {
  search: string;

  specialization: SpecializationKey;

  availability:
    | "all"
    | "available_today";

  consultationType: ConsultationTypeKey;
};