import { Router } from "express";

import {
  createDoctor,
  getDoctor,
  getMyDoctor,
  listDoctors,
  updateDoctor,
} from "./doctor.controller.js";

import requireAuth from "../../middleware/require-auth.js";

const router = Router();

router.get("/", listDoctors);

router.get(
  "/me",
  requireAuth(["doctor"]),
  getMyDoctor
);

router.put(
  "/me",
  requireAuth(["doctor"]),
  updateDoctor
);

router.get("/:id", getDoctor);

router.post(
  "/",
  requireAuth(["doctor"]),
  createDoctor
);

export default router;