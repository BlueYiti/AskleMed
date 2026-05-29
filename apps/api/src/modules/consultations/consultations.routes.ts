import { Router } from "express";
import {
  getMyConsultations,
  getConsultationById,
  createConsultation,
  updateConsultation,
} from "./consultations.controller.js";

const router = Router();

router.get("/me", getMyConsultations);
router.get("/:id", getConsultationById);
router.post("/", createConsultation);
router.patch("/:id", updateConsultation);

export default router;