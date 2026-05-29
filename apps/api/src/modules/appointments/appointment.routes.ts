import { Router } from "express";
import {
  createAppointment,
  listAppointments,
  getMyAppointments,
  getAppointmentById,
  getDoctorAppointments,
} from "./appointment.controller.js";

const router = Router();

/**
 * Admin / debug
 */
router.get("/", listAppointments);

/**
 * Patient dashboard
 */
router.get("/me", getMyAppointments);

/**
 * Doctor dashboard
 */
router.get("/doctor", getDoctorAppointments);

/**
 * Get single appointment (FIXED)
 */
router.get("/:appointmentId", getAppointmentById);

/**
 * Create appointment
 */
router.post("/", createAppointment);

export default router;