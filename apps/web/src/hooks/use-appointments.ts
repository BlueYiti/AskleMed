'use client'

import { useEffect, useMemo, useState } from 'react'
import { isAfter, isBefore } from 'date-fns'
import type { Appointment } from '@/types/appointment'

export type Tab = 'today' | 'upcoming' | 'completed' | 'cancelled' | 'inProgress'

export const TABS: Tab[] = [
  'today',
  'upcoming',
  'inProgress',
  'completed',
  'cancelled',
]

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

    const today = appointments.filter((a) => {
      const d = new Date(a.startsAt)
      return d.toDateString() === now.toDateString()
    })

    const upcoming = appointments.filter(
      (a) =>
        a.status !== 'cancelled' &&
        isAfter(new Date(a.startsAt), now)
    )

    // ❗ FIX: ONLY use real backend statuses (NO "completed" / "in_progress")
    const completed = appointments.filter(
      (a) => a.status === 'completed'
    )

    const cancelled = appointments.filter(
      (a) => a.status === 'cancelled'
    )

    // UI-derived in-progress (time-based, not status-based)
    const inProgress = appointments.filter((a) => {
      const start = new Date(a.startsAt)
      const end = new Date(a.endsAt)

      return (
        a.status !== 'cancelled' &&
        isBefore(start, now) &&
        isAfter(end, now)
      )
    })

    return {
      today,
      upcoming,
      completed,
      cancelled,
      inProgress,
    }
  }, [appointments])

  const appointmentDates = useMemo(
    () => appointments.map((a) => new Date(a.startsAt)),
    [appointments]
  )

  return { loading, categorized, appointmentDates }
}