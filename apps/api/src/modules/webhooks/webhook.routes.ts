import { Router } from "express";
import { calcomWebhook } from "./calcom.webhook.js";

const router = Router();

router.post("/calcom", calcomWebhook);

export default router;