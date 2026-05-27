import { Router } from "express";
import requireAuth from "../../middleware/require-auth.js";
import {
  createPatient,
  getPatient,
  listPatients,
} from "./patient.controller.js";

const router = Router();

// 🔐 protect everything in this module
router.use(requireAuth(["patient"]));

router.get("/", listPatients);
router.get("/:id", getPatient);
router.post("/", createPatient);

export default router;