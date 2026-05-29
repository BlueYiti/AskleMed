import Consultation from "./consultations.model.js";
import type { Request, Response } from "express";

/**
 * GET /api/consultations/me
 */
export const getMyConsultations = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const consultations = await Consultation.find({
      patientId: userId,
    })
      .populate("doctorId")
      .sort({ "schedule.startsAt": -1 });

    res.json({ consultations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch consultations" });
  }
};

/**
 * GET /api/consultations/:id
 */
export const getConsultationById = async (req: Request, res: Response) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate("doctorId")
      .populate("patientId");

    if (!consultation) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ consultation });
  } catch (err) {
    res.status(500).json({ message: "Error fetching consultation" });
  }
};

/**
 * POST /api/consultations
 */
export const createConsultation = async (req: Request, res: Response) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json({ consultation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create consultation" });
  }
};

/**
 * PATCH /api/consultations/:id
 */
export const updateConsultation = async (req: Request, res: Response) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ consultation: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update consultation" });
  }
};