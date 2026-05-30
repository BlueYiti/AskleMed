'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, Clock3, XCircle } from 'lucide-react'
import { format, isSameDay } from 'date-fns'

import Header from '@/components/layout/header'
import { useAppointments, TABS, type Tab } from '@/hooks/use-appointments'
import { SimpleCalendar } from '@/components/layout/appointments/simple-calendar'
import { AppointmentCard } from '@/components/layout/appointments/appointment-card'
import { SummaryCard } from '@/components/layout/appointments/summary-card'

export default function AppointmentsPage() {
  const { loading, categorized, appointmentDates } = useAppointments()
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredAppointments = useMemo(() => {
    const items = categorized[activeTab]
    if (!selectedDate) return items
    return items.filter((a) => isSameDay(new Date(a.startsAt), selectedDate))
  }, [categorized, activeTab, selectedDate])

  return (
    <div className="space-y-8 pb-10">
      <Header
        title="Appointments"
        description="Manage your upcoming consultations and appointment history."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading appointments...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
          {/* CALENDAR */}
          <div className="space-y-6 order-1">
            <div className="border rounded-2xl p-5 bg-background">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5" />
                <h2 className="font-semibold">Appointment Calendar</h2>
              </div>

              <SimpleCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                appointmentDates={appointmentDates}
              />

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-primary" />
                Dates with appointments
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-6 order-2">
            <div className="flex flex-wrap gap-3">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  <span className="capitalize">{tab}</span> ({categorized[tab].length})
                </button>
              ))}
            </div>

            {selectedDate && (
              <div className="text-sm text-muted-foreground">
                Showing appointments for{' '}
                <span className="font-medium text-foreground">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </span>
              </div>
            )}

            {filteredAppointments.length === 0 ? (
              <div className="border rounded-2xl p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No appointments found.
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

          {/* SUMMARY */}
          <div className="lg:col-start-1 order-3">
            <div className="border rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold">Appointment Summary</h2>

              <SummaryCard
                label="Upcoming"
                count={categorized.upcoming.length}
                icon={<Clock3 className="h-4 w-4" />}
              />

              <SummaryCard
                label="Completed"
                count={categorized.completed.length}
                icon={<CheckCircle2 className="h-4 w-4" />}
              />

              <SummaryCard
                label="Cancelled"
                count={categorized.cancelled.length}
                icon={<XCircle className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}