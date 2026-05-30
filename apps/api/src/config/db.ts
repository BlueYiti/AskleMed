// src/config/db.ts

import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { env } from "./env.js";

export const client = new MongoClient(env.MONGODB_URI);

// Separate connection state tracking (IMPORTANT)
let mongoosePromise: Promise<typeof mongoose> | null = null;
let mongoClientPromise: Promise<MongoClient> | null = null;

let mongooseReady = false;
let mongoReady = false;

/**
 * Ensures BOTH Mongoose + MongoClient are connected safely
 * Works in Vercel serverless (cold + warm starts)
 */
export async function connectDB() {
  // -------------------------
  // 1. MONGOOSE CONNECTION
  // -------------------------
  if (!mongooseReady) {
    if (!mongoosePromise) {
      mongoosePromise = mongoose.connect(env.MONGODB_URI, {
        dbName: env.MONGODB_NAME,
      });
    }

    await mongoosePromise;
    mongooseReady = mongoose.connection.readyState === 1;
  }

  // -------------------------
  // 2. NATIVE MONGO CLIENT
  // (used by Better Auth)
  // -------------------------
  if (!mongoReady) {
    if (!mongoClientPromise) {
      mongoClientPromise = client.connect();
    }

    await mongoClientPromise;
    mongoReady = true;
  }

  console.log("MongoDB ready (mongoose + client)");
}

/**
 * Optional cleanup (mostly for local dev only)
 */
export async function disconnectDB() {
  await Promise.all([
    mongoose.disconnect(),
    client.close(),
  ]);

  mongoosePromise = null;
  mongoClientPromise = null;
  mongooseReady = false;
  mongoReady = false;

  console.log("MongoDB disconnected");
}