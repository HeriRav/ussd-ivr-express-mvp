import {
  categories,
  coffeeAdviceEntries,
  getLocalizedLabel,
  regions,
  sectors,
  subcategories,
  type AdviceEntry
} from "../../../shared/data/agricultural-data";
import type {
  CategoryCatalogEntry,
  CreateSimulationHistoryInput,
  SimulationFilter,
  SimulationHistoryEntry,
  SimulationHistoryFilter,
  SimulationLanguage,
  SimulationRecord,
  SimulationStep
} from "../../domain/models/simulation";

export interface SimulationRepository {
  list(filter?: SimulationFilter): SimulationRecord[];
  findById(id: string): SimulationRecord | undefined;
  listCategories(): CategoryCatalogEntry[];
  listHistory(filter?: SimulationHistoryFilter): SimulationHistoryEntry[];
  recordHistory(input: CreateSimulationHistoryInput): SimulationHistoryEntry;
}

function normalizeCode(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function asLocalizedText(label: { mg: string; fr: string } | undefined): { mg: string; fr: string } {
  return {
    mg: label?.mg ?? "",
    fr: label?.fr ?? ""
  };
}

function buildCategoryStep(entry: { id: string; name: { mg: string; fr: string } }): SimulationStep {
  return {
    code: normalizeCode(entry.id),
    name: asLocalizedText(entry.name)
  };
}

function buildRegionData(entry: { id: string; name: { mg: string; fr: string } }): SimulationRecord["region"] {
  return {
    code: normalizeCode(entry.id),
    name: asLocalizedText(entry.name)
  };
}

function buildSectorData(entry: { id: string; name: { mg: string; fr: string } }): SimulationRecord["sector"] {
  return {
    code: normalizeCode(entry.id),
    name: asLocalizedText(entry.name)
  };
}

function normalizeLanguage(value: string | undefined): SimulationLanguage | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value);
  if (normalized === "mg" || normalized === "malagasy") return "mg";
  if (normalized === "fr" || normalized === "francais" || normalized === "french") return "fr";
  return undefined;
}

function normalizeChannel(value: string | undefined): "USSD" | "IVR" | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value);
  if (normalized === "ussd") return "USSD";
  if (normalized === "ivr") return "IVR";
  return undefined;
}

function normalizeSector(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value);
  if (["coffee", "cafe", "arabica", "cafe-arabica", "coffee-arabica", "cafe_arabica", "coffee_arabica"].includes(normalized)) {
    return "cafe-arabica";
  }

  const match = sectors.find((sector) =>
    normalizeText(sector.id) === normalized ||
    normalizeText(getLocalizedLabel(sector.name, "fr")) === normalized ||
    normalizeText(getLocalizedLabel(sector.name, "mg")) === normalized
  );
  return match?.id;
}

function normalizeRegion(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = normalizeText(value);
  const match = regions.find((region) =>
    normalizeText(region.id) === normalized ||
    normalizeText(getLocalizedLabel(region.name, "fr")) === normalized ||
    normalizeText(getLocalizedLabel(region.name, "mg")) === normalized
  );
  return match?.id;
}

function toSimulationRecord(entry: AdviceEntry): SimulationRecord {
  const region = regions.find((item) => item.id === entry.regionId)!;
  const sector = sectors.find((item) => item.id === entry.sectorId)!;
  const category = categories.find((item) => item.id === entry.categoryId)!;
  const subcategory = subcategories.find((item) => item.id === entry.subcategoryId)!;

  return {
    id: entry.id,
    region: buildRegionData(region),
    sector: buildSectorData(sector),
    category: buildCategoryStep(category),
    subcategory: buildCategoryStep(subcategory),
    advice: {
      ussd: asLocalizedText(entry.ussdContent ?? entry.content),
      ivr: asLocalizedText(entry.ivrContent ?? entry.content)
    }
  };
}

export class InMemorySimulationRepository implements SimulationRepository {
  private readonly records = coffeeAdviceEntries.map((entry) => toSimulationRecord(entry));
  private readonly historyEntries: SimulationHistoryEntry[] = [];

  list(filter?: SimulationFilter): SimulationRecord[] {
    const regionId = normalizeRegion(filter?.region);
    const sectorId = normalizeSector(filter?.sector);
    const channel = normalizeChannel(filter?.channel as string | undefined);
    const language = normalizeLanguage(filter?.language as string | undefined);

    return this.records.filter((record) => {
      const byRegion = regionId ? record.region.code === normalizeCode(regionId) : true;
      const bySector = sectorId ? record.sector.code === normalizeCode(sectorId) : true;
      const byChannel = channel ? (channel === "USSD" ? Boolean(record.advice.ussd) : Boolean(record.advice.ivr)) : true;
      const byLanguage = language ? (language === "mg" ? Boolean(record.advice.ussd.mg || record.advice.ivr.mg) : Boolean(record.advice.ussd.fr || record.advice.ivr.fr)) : true;
      return byRegion && bySector && byChannel && byLanguage;
    });
  }

  findById(id: string): SimulationRecord | undefined {
    return this.records.find((record) => record.id.toUpperCase() === id.trim().toUpperCase());
  }

  listCategories(): CategoryCatalogEntry[] {
    return sectors
      .map((sector) => {
        const sectorCategories = categories.filter((category) => category.sectorId === sector.id);
        const subcategoriesForSector = sectorCategories.flatMap((category) =>
          subcategories.filter((subcategory) => subcategory.categoryId === category.id)
        );

        if (subcategoriesForSector.length === 0) {
          return undefined;
        }

        const primaryCategory = sectorCategories[0] ?? categories[0];

        return {
          sector: buildSectorData(sector),
          category: buildCategoryStep(primaryCategory),
          categories: sectorCategories.map((category) => buildCategoryStep(category)),
          subcategories: subcategoriesForSector.map((subcategory) => buildCategoryStep(subcategory))
        };
      })
      .filter((entry): entry is CategoryCatalogEntry => Boolean(entry));
  }

  listHistory(filter?: SimulationHistoryFilter): SimulationHistoryEntry[] {
    return [...this.historyEntries]
      .filter((entry) => {
        if (filter?.simulationId && entry.simulationId.toUpperCase() !== filter.simulationId.trim().toUpperCase()) {
          return false;
        }
        if (filter?.channel && entry.channel !== filter.channel) {
          return false;
        }
        if (filter?.language && entry.language !== filter.language) {
          return false;
        }
        if (filter?.region && entry.region && entry.region.toLowerCase() !== filter.region.trim().toLowerCase()) {
          return false;
        }
        if (filter?.sector && entry.sector && entry.sector.toLowerCase() !== filter.sector.trim().toLowerCase()) {
          return false;
        }
        if (filter?.status && entry.status !== filter.status) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  recordHistory(input: CreateSimulationHistoryInput): SimulationHistoryEntry {
    const simulation = this.findById(input.simulationId);
    if (!simulation) {
      throw new Error(`Simulation ${input.simulationId} not found.`);
    }

    const now = new Date().toISOString();
    const historyEntry: SimulationHistoryEntry = {
      id: `H${this.historyEntries.length + 1}`.padStart(6, "0"),
      simulationId: simulation.id,
      channel: input.channel ?? "USSD",
      language: input.language ?? "fr",
      region: input.region ?? simulation.region.code,
      sector: input.sector ?? simulation.sector.code,
      status: input.status ?? "completed",
      createdAt: now,
      updatedAt: now
    };

    this.historyEntries.unshift(historyEntry);
    return historyEntry;
  }
}
