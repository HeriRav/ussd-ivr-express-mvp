export type SimulationLanguage = "mg" | "fr";
export type SimulationChannel = "USSD" | "IVR";

export type LocalizedText = {
  mg: string;
  fr: string;
};

export interface SimulationRegion {
  code: string;
  name: LocalizedText;
}

export interface SimulationSector {
  code: string;
  name: LocalizedText;
}

export interface SimulationStep {
  code: string;
  name: LocalizedText;
}

export interface SimulationAdvice {
  ussd: LocalizedText;
  ivr: LocalizedText;
}

export interface SimulationRecord {
  id: string;
  region: SimulationRegion;
  sector: SimulationSector;
  category: SimulationStep;
  subcategory: SimulationStep;
  advice: SimulationAdvice;
}

export interface SimulationFilter {
  channel?: SimulationChannel;
  language?: SimulationLanguage;
  region?: string;
  sector?: string;
}

export interface CategoryCatalogEntry {
  sector: SimulationSector;
  category: SimulationStep;
  categories: SimulationStep[];
  subcategories: SimulationStep[];
}

export type SimulationHistoryStatus = "in_progress" | "completed" | "abandoned";

export interface SimulationHistoryFilter {
  simulationId?: string;
  channel?: SimulationChannel;
  language?: SimulationLanguage;
  region?: string;
  sector?: string;
  status?: SimulationHistoryStatus;
}

export interface CreateSimulationHistoryInput {
  simulationId: string;
  channel?: SimulationChannel;
  language?: SimulationLanguage;
  region?: string;
  sector?: string;
  status?: SimulationHistoryStatus;
}

export interface SimulationHistoryEntry {
  id: string;
  simulationId: string;
  channel: SimulationChannel;
  language: SimulationLanguage;
  region?: string;
  sector?: string;
  status: SimulationHistoryStatus;
  createdAt: string;
  updatedAt: string;
}
