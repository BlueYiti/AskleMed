export const SPECIALIZATIONS = [
  { key: 'primary_care', label: 'Primary Care' },
  { key: 'women_health', label: "Women's Health" },
  { key: 'mental_health', label: 'Mental Health' },
  { key: 'dermatology', label: 'Dermatology' },
  { key: 'cardiology', label: 'Cardiology' },
  { key: 'neurology', label: 'Neurology' },
  { key: 'endocrinology', label: 'Endocrinology' },
  { key: 'gastroenterology', label: 'Gastroenterology' },
  { key: 'pulmonology', label: 'Pulmonology' },
  { key: 'orthopedics', label: 'Orthopedics' },
  { key: 'urology_nephrology', label: 'Urology / Nephrology' },
  { key: 'ophthalmology', label: 'Ophthalmology' },
  { key: 'ent', label: 'ENT' },
  { key: 'infectious_disease', label: 'Infectious Disease' },
  { key: 'urgent_care', label: 'Urgent Care' }
] as const

export const SPECIALIZATION_KEYS =
  SPECIALIZATIONS.map(s => s.key)

export type SpecializationKey =
  (typeof SPECIALIZATIONS)[number]['key']