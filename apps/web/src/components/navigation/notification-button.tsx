"use client";

import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <button
      className="
        relative
        w-11
        h-11
        rounded-2xl
        bg-white
        border
        border-slate-200
        flex
        items-center
        justify-center
        shadow-sm
        hover:shadow-md
        hover:bg-slate-50
        transition-all
        duration-200
      "
    >
      {/* Notification Dot */}
      <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />

      <Bell className="w-5 h-5 text-slate-600" />
    </button>
  );
};

export default NotificationButton;