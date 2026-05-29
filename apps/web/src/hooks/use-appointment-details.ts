import { useMemo } from "react";
import { useAppointments } from "@/hooks/use-appointments";
import type { Appointment } from "@/types/appointment";

interface UseAppointmentDetailsResult {
  appointment?: Appointment;
  loading: boolean;
}

export function useAppointmentDetails(
  appointmentId: string
): UseAppointmentDetailsResult {
  const { loading, categorized } = useAppointments();

  const appointment = useMemo(() => {
    if (!appointmentId) return undefined;

    const allAppointments = [
      ...categorized.upcoming,
      ...categorized.done,
      ...categorized.cancelled,
      ...categorized.past,
    ];

    return allAppointments.find(
      (a) => a._id === appointmentId
    );
  }, [appointmentId, categorized]);

  return {
    appointment,
    loading,
  };
}