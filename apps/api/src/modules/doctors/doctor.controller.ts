import type { Request, Response } from "express";
import { DoctorModel } from "./doctor.model.js";

/**
 * GET /api/doctors
 * Supports:
 * - search (name or specialization)
 * - specialization filter
 */
export async function listDoctors(req: Request, res: Response) {
  try {
    const search = (req.query.search as string) || "";
    const specialization = req.query.specialization as string | undefined;

    const query: any = {};

    // 🔍 Search by name OR specialization
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          specialization: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // 🎯 Filter by specialization
    if (specialization && specialization !== "all") {
      query.specialization = specialization;
    }

    const doctors = await DoctorModel.find(query)
      .select("name specialization experienceYears photoUrl availability calLink")
      .lean();

    res.json(
      doctors.map((doc) => ({
        _id: doc._id,
        name: doc.name,
        specialization: doc.specialization,
        experienceYears: doc.experienceYears ?? 0,
        photoUrl: doc.photoUrl ?? "/images/default-doctor.png",
        calLink: doc.calLink ?? "",
        availability: doc.availability ?? { isAvailableToday: false },
      }))
    );
  } catch (error) {
    console.error("listDoctors error:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
}

/**
 * GET /api/doctors/:id
 */
export async function getDoctor(req: Request, res: Response) {
  try {
    console.log("PARAM ID:", req.params.id);

    const doctor = await DoctorModel.findById(req.params.id)
      .select(
        "name specialization experienceYears photoUrl availability bio consultationTypes consultationFee clinicName clinicAddress languages userId calLink createdAt updatedAt"
      )
      .lean();

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({
      _id: doctor._id,
      userId: doctor.userId,

      name: doctor.name,
      calLink: doctor.calLink ?? "",

      photoUrl: doctor.photoUrl,
      specialization: doctor.specialization,
      experienceYears: doctor.experienceYears,

      bio: doctor.bio,

      consultationTypes: doctor.consultationTypes,
      consultationFee: doctor.consultationFee,

      availability: doctor.availability,

      clinicName: doctor.clinicName,
      clinicAddress: doctor.clinicAddress,

      languages: doctor.languages,

      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    });
  } catch (error) {
    console.error("getDoctor error:", error);
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
}

/**
 * POST /api/doctors
 */
export async function createDoctor(req: Request, res: Response) {
  try {
    const {
      name,
      specialization,
      experienceYears,
      photoUrl,
      availability,
      calLink,
    } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({
        error: "name and specialization are required",
      });
    }

    const doctor = await DoctorModel.create({
      name,
      specialization,
      experienceYears: experienceYears ?? 0,
      photoUrl: photoUrl ?? "/images/default-doctor.png",
      availability: availability ?? {
        isAvailableToday: true,
      },
      calLink: calLink ?? "",
    });

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      specialization: doctor.specialization,
      experienceYears: doctor.experienceYears,
      photoUrl: doctor.photoUrl,
      availability: doctor.availability,
      calLink: doctor.calLink ?? "",
    });
  } catch (error) {
    console.error("createDoctor error:", error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
}