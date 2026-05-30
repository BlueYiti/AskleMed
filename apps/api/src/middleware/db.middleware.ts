import type { Request, Response, NextFunction } from "express";
import { connectDB } from "../config/db.js";

export async function ensureDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}