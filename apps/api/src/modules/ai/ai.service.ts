import { GoogleGenAI } from '@google/genai'
import { z } from 'zod'

import {
  SPECIALIZATION_KEYS,
  SPECIALIZATIONS,
  type SpecializationKey
} from '../../types/specializations.js'

/**
 * =========================
 * 1. Gemini Client
 * =========================
 */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
})

/**
 * =========================
 * 2. Specialization Registry (SOURCE OF TRUTH)
 * =========================
 */

/**
 * =========================
 * 3. Response Schema (Zod)
 * =========================
 */
const RecommendationSchema = z.object({
  specializationKey: z.enum(
    SPECIALIZATION_KEYS as [
      SpecializationKey,
      ...SpecializationKey[]
    ]
  ),
  specializationLabel: z.string(),
  reason: z.string(),
  confidence: z.number().min(0).max(1)
})

export type Recommendation = z.infer<typeof RecommendationSchema>

/**
 * =========================
 * 4. Emergency Detection (NO AI NEEDED)
 * =========================
 */
const emergencyKeywords = [
  'chest pain',
  'difficulty breathing',
  'shortness of breath',
  'stroke',
  'seizure',
  'fainting',
  'unconscious',
  'suicidal',
  'severe bleeding',
  'heart attack'
]

function detectEmergency(symptoms: string): boolean {
  const text = symptoms.toLowerCase()
  return emergencyKeywords.some(keyword => text.includes(keyword))
}

/**
 * =========================
 * 5. Normalize Input
 * =========================
 */
function normalizeSymptoms(symptoms: string) {
  return symptoms.toLowerCase().trim().replace(/\s+/g, ' ')
}

/**
 * =========================
 * 6. AI Prompt
 * =========================
 */
function buildPrompt(symptoms: string) {
  return `
You are a medical triage assistant.

Your ONLY task is to select the most appropriate medical specialization.

IMPORTANT RULES:
- Do NOT diagnose diseases
- Do NOT recommend medication
- Do NOT suggest treatment
- Choose ONLY ONE specialization from the list
- specializationKey MUST match EXACTLY
- If unsure, choose primary_care
- If symptoms suggest urgency, choose urgent_care

SPECIALIZATIONS:
${JSON.stringify(SPECIALIZATIONS, null, 2)}

Return ONLY valid JSON:

{
  "specializationKey": "",
  "specializationLabel": "",
  "reason": "",
  "confidence": 0
}

Patient symptoms:
"${symptoms}"
`
}

/**
 * =========================
 * 7. Main Service
 * =========================
 */
export async function analyzeSymptoms(
  symptoms: string
): Promise<Recommendation> {
  try {
    const cleaned = normalizeSymptoms(symptoms)

    /**
     * STEP 1: Emergency shortcut (bypass AI)
     */
    if (detectEmergency(cleaned)) {
      return {
        specializationKey: 'urgent_care',
        specializationLabel: 'Urgent Care',
        reason:
          'Symptoms may indicate a medical emergency requiring immediate attention.',
        confidence: 1
      }
    }

    /**
     * STEP 2: AI Call (STRICT JSON MODE)
     */
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: buildPrompt(cleaned),
      config: {
        responseMimeType: 'application/json'
      }
    })

    const raw = response.text || '{}'

    /**
     * STEP 3: Parse safely
     */
    const parsed = JSON.parse(raw)

    const validated = RecommendationSchema.parse(parsed)

    /**
     * STEP 4: Normalize specializationKey (safety check)
     */
    if (!SPECIALIZATION_KEYS.includes(validated.specializationKey as any)) {
      return {
        specializationKey: 'primary_care',
        specializationLabel: 'Primary Care',
        reason: 'Invalid specialization returned by AI. Defaulting to Primary Care.',
        confidence: 0.5
      }
    }

    /**
     * STEP 5: Confidence fallback
     */
    if (validated.confidence < 0.6) {
      return {
        specializationKey: 'primary_care',
        specializationLabel: 'Primary Care',
        reason:
          'Low confidence in AI prediction. Defaulting to Primary Care for safety.',
        confidence: validated.confidence
      }
    }

    return validated
  } catch (error) {
    console.error('AI SERVICE ERROR:', error)

    return {
      specializationKey: 'primary_care',
      specializationLabel: 'Primary Care',
      reason: 'System error occurred. Defaulting to Primary Care.',
      confidence: 0
    }
  }
}