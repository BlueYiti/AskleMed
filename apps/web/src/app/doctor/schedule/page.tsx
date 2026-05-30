'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Clock3, Plus, Trash2, Sun, Moon } from 'lucide-react'
import { format, isSameDay } from 'date-fns'

import Header from '@/components/layout/header'

type DaySchedule = {
  day: string
  slots: { start: string; end: string }[]
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

type ViewMode = 'week' | 'day' | 'rules'

export default function SchedulePage() {
  const [mode, setMode] = useState<ViewMode>('week')
  const [selectedDay, setSelectedDay] = useState('Monday')

  const [schedule, setSchedule] = useState<DaySchedule[]>(
    DAYS.map((d) => ({ day: d, slots: [] }))
  )

  const [newSlot, setNewSlot] = useState({
    start: '',
    end: '',
  })

  const activeDay = useMemo(() => {
    return schedule.find((s) => s.day === selectedDay)!
  }, [selectedDay, schedule])

  const addSlot = () => {
    if (!newSlot.start || !newSlot.end) return

    setSchedule((prev) =>
      prev.map((d) =>
        d.day === selectedDay
          ? {
              ...d,
              slots: [...d.slots, { start: newSlot.start, end: newSlot.end }],
            }
          : d
      )
    )

    setNewSlot({ start: '', end: '' })
  }

  const removeSlot = (index: number) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.day === selectedDay
          ? {
              ...d,
              slots: d.slots.filter((_, i) => i !== index),
            }
          : d
      )
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <Header
        title="Schedule"
        description="Define your consultation availability and working patterns."
      />

      {/* MODE SWITCH */}
      <div className="flex gap-2">
        {(['week', 'day', 'rules'] as ViewMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              mode === m
                ? 'bg-black text-white border-black'
                : 'hover:bg-muted'
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* WEEK MODE */}
      {mode === 'week' && (
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* LEFT: DAYS */}
          <div className="border rounded-2xl p-4 space-y-2 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-4 w-4" />
              <p className="font-semibold">Week View</p>
            </div>

            {schedule.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`w-full text-left px-3 py-2 rounded-xl border text-sm transition ${
                  selectedDay === d.day
                    ? 'bg-muted font-medium'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex justify-between">
                  <span>{d.day}</span>
                  <span className="text-xs text-muted-foreground">
                    {d.slots.length} slots
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT: EDITOR */}
          <div className="space-y-6">
            {/* ADD SLOT */}
            <div className="border rounded-2xl p-5 bg-white space-y-4">
              <h2 className="font-semibold">
                {selectedDay} Availability
              </h2>

              <div className="flex flex-wrap gap-3">
                <input
                  type="time"
                  className="border rounded-xl p-2"
                  value={newSlot.start}
                  onChange={(e) =>
                    setNewSlot((p) => ({ ...p, start: e.target.value }))
                  }
                />

                <input
                  type="time"
                  className="border rounded-xl p-2"
                  value={newSlot.end}
                  onChange={(e) =>
                    setNewSlot((p) => ({ ...p, end: e.target.value }))
                  }
                />

                <button
                  onClick={addSlot}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                  Add Slot
                </button>
              </div>
            </div>

            {/* SLOT LIST */}
            <div className="border rounded-2xl p-5 bg-white">
              <h3 className="font-semibold mb-4">Current Slots</h3>

              {activeDay.slots.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No availability set for this day.
                </p>
              ) : (
                <div className="space-y-3">
                  {activeDay.slots.map((slot, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border rounded-xl p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        <span className="text-sm">
                          {slot.start} → {slot.end}
                        </span>
                      </div>

                      <button
                        onClick={() => removeSlot(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DAY MODE (simplified timeline view) */}
      {mode === 'day' && (
        <div className="border rounded-2xl p-6 bg-white space-y-4">
          <h2 className="font-semibold">Daily Timeline View</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.map((d) => (
              <div key={d.day} className="border rounded-xl p-4 space-y-2">
                <p className="font-medium">{d.day}</p>

                {d.slots.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No availability
                  </p>
                ) : (
                  d.slots.map((s, i) => (
                    <div
                      key={i}
                      className="text-sm flex items-center justify-between"
                    >
                      <span>{s.start} - {s.end}</span>
                      <Sun className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RULES MODE */}
      {mode === 'rules' && (
        <div className="border rounded-2xl p-6 bg-white space-y-4">
          <h2 className="font-semibold">Scheduling Rules</h2>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Default consultation duration: 30 minutes</p>
            <p>• Buffer time between patients: 10 minutes</p>
            <p>• Max daily appointments: (not configured yet)</p>
          </div>

          <button className="mt-4 px-4 py-2 rounded-xl bg-black text-white">
            Configure Rules
          </button>
        </div>
      )}
    </div>
  )
}