'use client'

import { useState } from 'react'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from '@/components/layout/header'
import { formatSpecialization } from '@/utils/format-specialization'

interface Doctor {
  _id: string
  name: string
  photoUrl?: string
  specialization: string
  profilePicture?: string
}

interface RecommendationResponse {
  recommendation: {
    specializationKey: string
    specializationLabel: string
    reason: string
    confidence: number
  }
  doctors: Doctor[]
}

const AIPage = () => {
  const [symptoms, setSymptoms] = useState('')

  const [loading, setLoading] =
    useState(false)

  const [result, setResult] =
    useState<RecommendationResponse | null>(
      null
    )

  const [error, setError] = useState('')

  async function handleAnalyze() {
    try {
      setLoading(true)
      setError('')
      setResult(null)

      const res = await fetch(
        'http://localhost:5000/api/ai/recommend-doctors',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            symptoms
          })
        }
      )

      if (!res.ok) {
        throw new Error(
          'Failed to analyze symptoms'
        )
      }

      const data = await res.json()

      setResult(data)
    } catch (err) {
      console.error(err)

      setError(
        'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Header
        title="AI"
        description="Explore AI-powered features and insights"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                AI Doctor Recommendation
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Describe your symptoms or
                healthcare concerns and our AI
                will recommend the most
                appropriate specialist for you.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">
                Symptoms / Concerns
              </label>

              <textarea
                value={symptoms}
                onChange={(e) =>
                  setSymptoms(e.target.value)
                }
                placeholder="Example: I have chest pain, shortness of breath, and dizziness..."
                className="h-40 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none transition focus:border-slate-400"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={
                loading || !symptoms.trim()
              }
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? 'Analyzing Symptoms...'
                : 'Get Recommendation'}
            </button>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Important Notice
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            AI recommendations are for
            informational purposes only and
            should not be considered medical
            advice, diagnosis, or treatment.
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Always consult a licensed
            healthcare professional for proper
            medical evaluation.
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Recommended Specialist
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {
                  result.recommendation
                    ?.specializationLabel
                }
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                {
                  result.recommendation
                    ?.reason
                }
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 px-4 py-3">
              <p className="text-sm text-slate-500">
                Doctors Found
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {result.doctors.length}
              </p>
            </div>
          </div>

          {/* Doctors */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {result.doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={doctor.photoUrl || "/placeholder-avatar.png"}
                      alt={doctor.name}
                      className="h-16 w-16 rounded-full object-cover border border-slate-200 shadow-sm"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="truncate text-base font-semibold text-slate-900">
                          {doctor.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatSpecialization(doctor.specialization)}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        Available Today
                      </span>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        5+ Years Exp.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Consultation Fee</p>
                    <p className="text-sm font-semibold text-slate-900">
                      ₱500
                    </p>
                  </div>

                  <Link href={`/patient/doctors/${doctor._id}`}>
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-900 px-4 text-white transition-all duration-200 hover:bg-slate-800 group-hover:shadow-md"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIPage