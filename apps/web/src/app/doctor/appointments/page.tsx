'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Stethoscope, UserRound, Clock3, Activity } from 'lucide-react'
import { format, isSameDay } from 'date-fns'

import Header from '@/components/layout/header'
import { useAppointments, type Tab } from '@/hooks/use-appointments'
import { SimpleCalendar } from '@/components/layout/appointments/simple-calendar'
import { AppointmentCard } from '@/components/layout/appointments/appointment-card'
import { SummaryCard } from '@/components/layout/appointments/summary-card'

export default function DoctorAppointmentsPage() {
  const { loading, categorized, appointmentDates } = useAppointments()

  const DOCTOR_TABS: Tab[] = ['today', 'upcoming', 'inProgress', 'completed', 'cancelled']

  const [activeTab, setActiveTab] = useState<Tab>('today')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredAppointments = useMemo(() => {
    const items = categorized[activeTab] || []

    if (!selectedDate) return items

    return items.filter((a) =>
      isSameDay(new Date(a.startsAt), selectedDate)
    )
  }, [categorized, activeTab, selectedDate])

  return (
    <div className="space-y-8 pb-10">
      <Header
        title="Doctor Dashboard - Appointments"
        description="Manage patient consultations, schedules, and daily workflow."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading schedule...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="border rounded-2xl p-5 bg-background">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5" />
                <h2 className="font-semibold">Doctor Schedule</h2>
              </div>

              <SimpleCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                appointmentDates={appointmentDates}
              />
            </div>

            <div className="border rounded-2xl p-5 space-y-3">
              <h2 className="font-semibold">Today’s Flow</h2>

              <SummaryCard label="In Queue" count={categorized.today.length} icon={<UserRound className="h-4 w-4" />} />
              <SummaryCard label="In Progress" count={categorized.inProgress.length} icon={<Activity className="h-4 w-4" />} />
              <SummaryCard label="Completed" count={categorized.completed.length} icon={<Stethoscope className="h-4 w-4" />} />
            </div>
          </div>

          {/* MAIN */}
          <div className="space-y-6">

            <div className="flex flex-wrap gap-3">
              {DOCTOR_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  <span className="capitalize">{tab}</span>
                  {' '}({categorized[tab].length})
                </button>
              ))}
            </div>

            {selectedDate && (
              <div className="text-sm text-muted-foreground">
                Schedule for{' '}
                <span className="font-medium text-foreground">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </span>
              </div>
            )}

            {filteredAppointments.length === 0 ? (
              <div className="border rounded-2xl p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No patient appointments found.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((a) => (
                  <AppointmentCard key={a._id} appointment={a} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="border rounded-2xl p-5 space-y-4">
            <h2 className="font-semibold">Clinical Overview</h2>

            <SummaryCard label="Scheduled" count={categorized.upcoming.length} icon={<Clock3 className="h-4 w-4" />} />
            <SummaryCard label="Completed" count={categorized.completed.length} icon={<Stethoscope className="h-4 w-4" />} />
            <SummaryCard label="Cancelled" count={categorized.cancelled.length} icon={<Activity className="h-4 w-4" />} />
          </div>

        </div>
      )}
    </div>
  )
}