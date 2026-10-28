import type { Request, Response } from "express";
import type { CreateSimulationHistoryUseCase } from "../../application/use-cases/create-simulation-history";
import type { GetCategoryCatalogUseCase } from "../../application/use-cases/get-category-catalog";
import type { GetSimulationByIdUseCase } from "../../application/use-cases/get-simulation-by-id";
import type { GetSimulationHistoryUseCase } from "../../application/use-cases/get-simulation-history";
import type { GetSimulationsUseCase } from "../../application/use-cases/get-simulations";
import type {
  CreateSimulationHistoryInput,
  SimulationFilter,
  SimulationHistoryFilter,
  SimulationLanguage
} from "../../domain/models/simulation";

function parseSingleValue(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return typeof value === "string" ? value : undefined;
}

function normalizeLanguage(value: string | undefined): SimulationLanguage | undefined {
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

function normalizeHistoryStatus(value: string | undefined): "in_progress" | "completed" | "abandoned" | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "in_progress" || normalized === "in-progress") return "in_progress";
  if (normalized === "completed") return "completed";
  if (normalized === "abandoned") return "abandoned";
  return undefined;
}

export function createSimulationsController(
  getSimulations: GetSimulationsUseCase,
  getSimulationById: GetSimulationByIdUseCase,
  getCategoryCatalog: GetCategoryCatalogUseCase,
  createHistory: CreateSimulationHistoryUseCase,
  getHistory: GetSimulationHistoryUseCase
) {
  return {
    getAll: (req: Request, res: Response): void => {
      const { channel, language, region, sector } = req.query;
      const normalizedChannel = normalizeChannel(parseSingleValue(channel));
      const normalizedLanguage = normalizeLanguage(parseSingleValue(language));
      const normalizedRegion = parseSingleValue(region);
      const normalizedSector = parseSingleValue(sector);

      if (channel !== undefined && !normalizedChannel) {
        res.status(400).json({ success: false, error: "Unsupported channel filter. Use USSD or IVR." });
        return;
      }

      if (language !== undefined && !normalizedLanguage) {
        res.status(400).json({ success: false, error: "Unsupported language filter. Use mg or fr." });
        return;
      }

      const filters: SimulationFilter = {
        channel: normalizedChannel,
        language: normalizedLanguage,
        region: normalizedRegion,
        sector: normalizedSector
      };

      const data = getSimulations.execute(filters);
      res.status(200).json({ success: true, data });
    },
    getById: (req: Request, res: Response): void => {
      const id = String(req.params.id ?? "").trim();
      if (!id) {
        res.status(400).json({ success: false, error: "Simulation identifier is required." });
        return;
      }

      const data = getSimulationById.execute(id);
      if (!data) {
        res.status(404).json({ success: false, error: `Simulation ${id} not found.` });
        return;
      }

      res.status(200).json({ success: true, data });
    },
    getCategories: (_req: Request, res: Response): void => {
      const data = getCategoryCatalog.execute();
      res.status(200).json({ success: true, data });
    },
    getHistory: (req: Request, res: Response): void => {
      const { simulationId, channel, language, region, sector, status } = req.query;
      const filters: SimulationHistoryFilter = {
        simulationId: parseSingleValue(simulationId),
        channel: normalizeChannel(parseSingleValue(channel)),
        language: normalizeLanguage(parseSingleValue(language)),
        region: parseSingleValue(region),
        sector: parseSingleValue(sector),
        status: normalizeHistoryStatus(parseSingleValue(status))
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
        res.status(400).json({ success: false, error: "Unsupported status filter. Use in_progress, completed or abandoned." });
        return;
      }

      const data = getHistory.execute(filters);
      res.status(200).json({ success: true, data });
    },
    createHistory: (req: Request, res: Response): void => {
      const payload = req.body as Partial<CreateSimulationHistoryInput> | undefined;
      if (!payload?.simulationId) {
        res.status(400).json({ success: false, error: "Simulation identifier is required." });
        return;
      }

      const channel = normalizeChannel(parseSingleValue((payload.channel as string | undefined))) ?? payload.channel;
      const language = normalizeLanguage(parseSingleValue((payload.language as string | undefined))) ?? payload.language;
      const status = normalizeHistoryStatus(typeof payload.status === "string" ? payload.status : undefined) ?? "completed";

      try {
        const history = createHistory.execute({
          simulationId: payload.simulationId,
          channel: channel ?? "USSD",
          language: language ?? "fr",
          region: payload.region,
          sector: payload.sector,
          status
        });
        res.status(201).json({ success: true, data: history });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to record simulation history.";
        res.status(404).json({ success: false, error: message });
      }
    }
  };
}
