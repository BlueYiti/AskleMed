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
        calLink: doc.calLink ?? ""
      }))
    );
  } catch (error) {
    console.error("listDoctors error:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
}

/**
 * GET /api/doctors/me
 * returns logged-in doctor profile
 */
export async function getMyDoctor(req: Request, res: Response) {
  try {
    const authId = (req as any).user?.id; // from JWT middleware

    if (!authId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const doctor = await DoctorModel.findOne({ authId })
      .select(
        "name email phone specialization experienceYears photoUrl bio consultationTypes consultationFee clinicName clinicAddress languages calLink isVerified createdAt updatedAt"
      )
      .lean();

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    return res.json(doctor);
  } catch (error) {
    console.error("getMyDoctor error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
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
      userId: doctor.authId,

      name: doctor.name,
      calLink: doctor.calLink ?? "",

      photoUrl: doctor.photoUrl,
      specialization: doctor.specialization,
      experienceYears: doctor.experienceYears,

      bio: doctor.bio,

      consultationTypes: doctor.consultationTypes,
      consultationFee: doctor.consultationFee,

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
      email,
      specialization,
      experienceYears,
      photoUrl,
      calLink,
    } = req.body;

    const authId = (req as any).user?.id; // IMPORTANT

    if (!authId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const doctor = await DoctorModel.create({
      authId, // 🔥 REQUIRED FIX
      name,
      email,
      specialization,
      experienceYears: experienceYears ?? 0,
      photoUrl: photoUrl ?? "/images/default-doctor.png",
      calLink: calLink ?? "",
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.error("createDoctor error:", error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
}

/**
 * PUT /api/doctors/me
 */
export async function updateDoctor(
  req: Request,
  res: Response
) {
  try {
    const authId = (req as any).user?.id;

    if (!authId) {
      return res
        .status(401)
        .json({ error: "Unauthorized" });
    }

    const {
      name,
      phone,
      bio,
      specialization,
      experienceYears,
      consultationTypes,
      consultationFee,
      clinicName,
      clinicAddress,
      languages,
      calLink,
    } = req.body;

    const doctor =
      await DoctorModel.findOneAndUpdate(
        { authId },
        {
          name,
          phone,
          bio,
          specialization,
          experienceYears,
          consultationTypes,
          consultationFee,
          clinicName,
          clinicAddress,
          languages,
          calLink,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!doctor) {
      return res
        .status(404)
        .json({ error: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    console.error(
      "updateDoctor error:",
      error
    );

    res.status(500).json({
      error: "Failed to update profile",
    });
  }
}