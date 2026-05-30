import dotenv from 'dotenv'

dotenv.config()

function required(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is missing in .env`)
  }

  return value
}

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/asklemed',
  MONGODB_NAME: process.env.MONGODB_NAME || 'asklemed',
  BETTER_AUTH_SECRET: required('BETTER_AUTH_SECRET'),
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  GEMINI_API_KEY: required('GEMINI_API_KEY'),
  CALCOM_WEBHOOK_SECRET: required('CALCOM_WEBHOOK_SECRET'),
}