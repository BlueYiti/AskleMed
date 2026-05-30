'use client'

import { useState } from 'react'
import { User, Stethoscope, Lock, Bell, Globe, Settings } from 'lucide-react'
import Header from '@/components/layout/header'

type Tab = 'profile' | 'clinic' | 'security' | 'notifications'

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'clinic', label: 'Clinic', icon: Stethoscope },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ] as const

  return (
    <div className="space-y-8">
      <Header
        title="Settings"
        description="Manage your account, clinic, and system preferences"
      />

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* LEFT NAV */}
        <div className="rounded-2xl border bg-white p-3 h-fit space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition ${
                tab === id
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          {/* PROFILE */}
          {tab === 'profile' && (
            <div className="rounded-2xl border bg-white p-6 space-y-5">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <h2 className="font-semibold">Profile Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="First name"
                  className="border rounded-xl p-3"
                />
                <input
                  placeholder="Last name"
                  className="border rounded-xl p-3"
                />
                <input
                  placeholder="Email"
                  className="border rounded-xl p-3 md:col-span-2"
                />
                <input
                  placeholder="Phone number"
                  className="border rounded-xl p-3 md:col-span-2"
                />
              </div>

              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl">
                Save Changes
              </button>
            </div>
          )}

          {/* CLINIC */}
          {tab === 'clinic' && (
            <div className="rounded-2xl border bg-white p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                <h2 className="font-semibold">Clinic Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Clinic name"
                  className="border rounded-xl p-3 md:col-span-2"
                />
                <input
                  placeholder="Address"
                  className="border rounded-xl p-3 md:col-span-2"
                />
                <input
                  placeholder="City"
                  className="border rounded-xl p-3"
                />
                <input
                  placeholder="Country"
                  className="border rounded-xl p-3"
                />
              </div>

              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl">
                Update Clinic
              </button>
            </div>
          )}

          {/* SECURITY */}
          {tab === 'security' && (
            <div className="rounded-2xl border bg-white p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <h2 className="font-semibold">Security</h2>
              </div>

              <input
                type="password"
                placeholder="Current password"
                className="border rounded-xl p-3 w-full"
              />
              <input
                type="password"
                placeholder="New password"
                className="border rounded-xl p-3 w-full"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="border rounded-xl p-3 w-full"
              />

              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl">
                Update Password
              </button>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {tab === 'notifications' && (
            <div className="rounded-2xl border bg-white p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h2 className="font-semibold">Notifications</h2>
              </div>

              <label className="flex items-center justify-between border rounded-xl p-3">
                <span>Email notifications</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex items-center justify-between border rounded-xl p-3">
                <span>SMS reminders</span>
                <input type="checkbox" />
              </label>

              <label className="flex items-center justify-between border rounded-xl p-3">
                <span>New appointment alerts</span>
                <input type="checkbox" defaultChecked />
              </label>
            </div>
          )}
        </div>

        {/* RIGHT SIDE INFO PANEL */}
        <div className="hidden lg:block space-y-4">
          <div className="rounded-2xl border bg-white p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <h3 className="font-semibold">System Status</h3>
            </div>

            <p className="text-sm text-slate-500">
              Your account is active and fully operational.
            </p>

            <div className="text-xs text-slate-500">
              Profile completion
            </div>

            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-slate-900" />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="font-semibold">Quick Actions</h3>

            <button className="w-full text-left px-3 py-2 border rounded-xl hover:bg-slate-100 text-sm">
              Export Data
            </button>

            <button className="w-full text-left px-3 py-2 border rounded-xl hover:bg-slate-100 text-sm">
              Download Reports
            </button>

            <button className="w-full text-left px-3 py-2 border rounded-xl hover:bg-red-50 text-red-500 text-sm">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}