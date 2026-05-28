'use client'

import { useEffect, useMemo, useState } from 'react'
import { isAfter, isBefore, startOfDay } from 'date-fns'
import type { Appointment } from '@/types/appointment'

export type Tab = 'upcoming' | 'done' | 'cancelled' | 'past'

export const TABS: Tab[] = ['upcoming', 'done', 'cancelled', 'past']

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/me`,
          { method: 'GET', credentials: 'include' }
        )

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`API Error ${res.status}: ${text}`)
        }

        const data = await res.json()
        setAppointments(data.appointments || [])
      } catch (error) {
        console.error('❌ Failed to fetch appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const categorized = useMemo(() => {
    const now = new Date()

    return {
      upcoming: appointments.filter(
        (a) => a.status !== 'cancelled' && isAfter(new Date(a.startsAt), now)
      ),
      cancelled: appointments.filter((a) => a.status === 'cancelled'),
      done: appointments.filter(
        (a) => a.status === 'completed' || a.status === 'done'
      ),
      past: appointments.filter((a) => {
        const endsAt = new Date(a.endsAt)
        return (
          a.status !== 'cancelled' &&
          a.status !== 'completed' &&
          a.status !== 'done' &&
          isBefore(endsAt, now)
        )
      }),
    }
  }, [appointments])

  const appointmentDates = useMemo(
    () => appointments.map((a) => startOfDay(new Date(a.startsAt))),
    [appointments]
  )

  return { loading, categorized, appointmentDates }
}