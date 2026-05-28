import { Router } from "express";
import {
  createAppointment,
  listAppointments,
  getMyAppointments,
  getDoctorAppointments,
} from "./appointment.controller.js";

const router = Router();

/**
 * Admin / debug
 */
router.get("/", listAppointments);

/**
 * Patient dashboard
 * GET /appointments/me?email=...
 */
router.get("/me", getMyAppointments);

/**
 * Doctor dashboard
 * GET /appointments/doctor?email=...
 */
router.get("/doctor", getDoctorAppointments);

/**
 * Create appointment
 */
router.post("/", createAppointment);

export default router;