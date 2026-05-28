export type UserRole = 'patient' | 'doctor' | 'admin'

export interface User extends Document {
  authId: string

  email: string
  name: string

  role: UserRole

  avatar?: string

  isVerified: boolean
  isActive: boolean

  createdAt: Date
  updatedAt: Date
}