import type { Request, Response } from "express";
import type { CreateSessionUseCase } from "../../application/use-cases/create-session";
import type { GetSessionByIdUseCase } from "../../application/use-cases/get-session-by-id";
import type { GetSessionsUseCase } from "../../application/use-cases/get-sessions";
import type { CreateSessionInput, SessionFilter, SessionLanguage, SessionStatus } from "../../domain/models/session";

function parseSingleValue(value: unknown): string | undefined {
  if (Array.isArray(value)) return value[0];
  return typeof value === "string" ? value : undefined;
}

function normalizeLanguage(value: string | undefined): SessionLanguage | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "mg" || normalized === "malagasy") return "mg";
  if (normalized === "fr" || normalized === "francais" || normalized === "french") return "fr";
  return undefined;
}

function normalizeChannel(value: string | undefined): "USSD" | "IVR" | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toUpperCase();
  if (normalized === "USSD") return "USSD";
  if (normalized === "IVR") return "IVR";
  return undefined;
}

function normalizeStatus(value: string | undefined): SessionStatus | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "active") return "active";
  if (normalized === "completed") return "completed";
  if (normalized === "abandoned") return "abandoned";
  if (normalized === "expired") return "expired";
  return undefined;
}

export function createSessionsController(
  getSessions: GetSessionsUseCase,
  getSessionById: GetSessionByIdUseCase,
  createSession: CreateSessionUseCase
) {
  return {
    getAll: (req: Request, res: Response): void => {
      const { channel, language, region, sector, status } = req.query;
      const filters: SessionFilter = {
        channel: normalizeChannel(parseSingleValue(channel)),
        language: normalizeLanguage(parseSingleValue(language)),
        region: parseSingleValue(region),
        sector: parseSingleValue(sector),
        status: normalizeStatus(parseSingleValue(status))
      };

      if (channel !== undefined && !filters.channel) {
        res.status(400).json({ success: false, error: "Unsupported channel filter. Use USSD or IVR." });
        return;
      }

      if (language !== undefined && !filters.language) {
        res.status(400).json({ success: false, error: "Unsupported language filter. Use mg or fr." });
        return;
      }

      if (status !== undefined && !filters.status) {
        res.status(400).json({ success: false, error: "Unsupported status filter. Use active, completed, abandoned or expired." });
        return;
      }

      const data = getSessions.execute(filters);
      res.status(200).json({ success: true, data });
    },
    getById: (req: Request, res: Response): void => {
      const sessionId = String(req.params.id ?? "").trim();
      if (!sessionId) {
        res.status(400).json({ success: false, error: "Session identifier is required." });
        return;
      }

      const data = getSessionById.execute(sessionId);
      if (!data) {
        res.status(404).json({ success: false, error: `Session ${sessionId} not found.` });
        return;
      }

      res.status(200).json({ success: true, data });
    },
    create: (req: Request, res: Response): void => {
      const payload = (req.body ?? {}) as Partial<CreateSessionInput>;
      const sessionId = payload.sessionId?.trim();
      const channel = normalizeChannel(parseSingleValue(payload.channel as string | undefined)) ?? payload.channel ?? "USSD";
      const language = normalizeLanguage(parseSingleValue(payload.language as string | undefined)) ?? payload.language ?? "fr";
      const status = normalizeStatus(typeof payload.status === "string" ? payload.status : undefined) ?? "active";

      if (!sessionId && !payload.channel && !payload.language && !payload.region && !payload.sector && !payload.category && !payload.subcategory && !payload.currentStep && !payload.status) {
        res.status(400).json({ success: false, error: "Payload is required to create a session." });
        return;
      }

      const data = createSession.execute({
        sessionId,
        channel,
        language,
        region: payload.region,
        sector: payload.sector,
        category: payload.category,
        subcategory: payload.subcategory,
        currentStep: payload.currentStep,
        status
      });

      res.status(201).json({ success: true, data });
    }
  };
}
