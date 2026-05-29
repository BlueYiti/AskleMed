import { useEffect, useMemo, useState } from 'react'
import {
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfDay,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface Props {
  selectedDate?: Date
  onSelectDate: (date: Date) => void
  appointmentDates: Date[]
}

export function SimpleCalendar({
  selectedDate,
  onSelectDate,
  appointmentDates,
}: Props) {
  const today = startOfDay(new Date())

  // Find nearest upcoming appointment
  const nearestUpcomingAppointment = useMemo(() => {
    return appointmentDates
      .filter((date) => startOfDay(date) >= today)
      .sort((a, b) => a.getTime() - b.getTime())[0]
  }, [appointmentDates, today])

  // Default calendar month
  const [viewDate, setViewDate] = useState(
    nearestUpcomingAppointment || new Date()
  )

  // Auto jump if appointments load later
  useEffect(() => {
    if (nearestUpcomingAppointment) {
      setViewDate(nearestUpcomingAppointment)

      // Optional: auto select nearest appointment
      if (!selectedDate) {
        onSelectDate(nearestUpcomingAppointment)
      }
    }
  }, [nearestUpcomingAppointment])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const days: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    ),
  ]

  const isCurrentMonth = isSameMonth(viewDate, today)

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-sm font-medium">
          {format(viewDate, 'MMMM yyyy')}

          {isCurrentMonth && (
            <span className="ml-1.5 text-xs text-muted-foreground font-normal">
              (this month)
            </span>
          )}
        </span>

        <button
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, i) => {
          if (!date) return <div key={i} className="aspect-square" />

          const hasAppointment = appointmentDates.some((d) =>
            isSameDay(d, date)
          )

          const isSelected =
            selectedDate && isSameDay(selectedDate, date)

          const isToday = isSameDay(date, today)

          return (
            <button
              key={i}
              onClick={() => onSelectDate(date)}
              className={`aspect-square rounded-xl text-sm transition relative font-medium ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : isToday
                  ? 'border border-primary text-primary hover:bg-muted'
                  : 'hover:bg-muted'
              }`}
            >
              {date.getDate()}

              {hasAppointment && (
                <div
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? 'bg-primary-foreground'
                      : 'bg-primary'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}