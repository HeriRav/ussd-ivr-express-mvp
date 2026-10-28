export type { LanguageCode, Region, Sector, Category, Subcategory, AdviceEntry, LocalizedText } from "../data/agricultural-data";

import {
  adviceEntries,
  categories,
  getAdviceActionMenu,
  getAdviceText,
  getLocalizedLabel,
  getUssdInvalidChoiceMessage,
  getUssdTimeoutMessage,
  regions,
  sectors,
  subcategories,
  type LanguageCode,
  type Region,
  type Sector,
  type Category,
  type Subcategory,
  type AdviceEntry
} from "../data/agricultural-data";

export type ConsultationState = {
  language?: LanguageCode;
  regionId?: string;
  sectorId?: string;
  categoryId?: string;
  subcategoryId?: string;
};

export type ConsultationMenuStage =
  | "language"
  | "region"
  | "sector"
  | "category"
  | "subcategory"
  | "advice"
  | "error";

export type ConsultationResult = {
  stage: ConsultationMenuStage;
  message: string;
  endSession: boolean;
  state: ConsultationState;
};

export function resolveLanguageChoice(rawValue?: string): LanguageCode | undefined {
  switch (rawValue) {
    case "1":
      return "mg";
    case "2":
      return "fr";
    default:
      return undefined;
  }
}

export function getRegionByIndex(index: string): Region | undefined {
  const numericIndex = Number(index);
  if (!Number.isInteger(numericIndex) || numericIndex < 1) return undefined;
  return regions[numericIndex - 1];
}

export function getSectorByIndex(regionId: string, index: string): Sector | undefined {
  const filtered = getSectorsForRegion(regionId);
  const numericIndex = Number(index);
  if (!Number.isInteger(numericIndex) || numericIndex < 1) return undefined;
  return filtered[numericIndex - 1];
}

export function getCategoryByIndex(sectorId: string, index: string): Category | undefined {
  const filtered = getCategoriesForSector(sectorId);
  const numericIndex = Number(index);
  if (!Number.isInteger(numericIndex) || numericIndex < 1) return undefined;
  return filtered[numericIndex - 1];
}

export function getSubcategoryByIndex(categoryId: string, index: string): Subcategory | undefined {
  const filtered = getSubcategoriesForCategory(categoryId);
  const numericIndex = Number(index);
  if (!Number.isInteger(numericIndex) || numericIndex < 1) return undefined;
  return filtered[numericIndex - 1];
}

export function getSectorsForRegion(regionId: string): Sector[] {
  return sectors.filter((sector) => sector.regions.includes(regionId));
}

export function getCategoriesForSector(sectorId: string): Category[] {
  return categories.filter((category) => category.sectorId === sectorId);
}

export function getSubcategoriesForCategory(categoryId: string): Subcategory[] {
  return subcategories.filter((subcategory) => subcategory.categoryId === categoryId);
}

export function getAdviceForSelection(
  state: ConsultationState,
  language: LanguageCode
): AdviceEntry | undefined {
  if (!state.regionId || !state.sectorId || !state.categoryId || !state.subcategoryId) {
    return undefined;
  }

  return adviceEntries.find(
    (entry) =>
      entry.regionId === state.regionId &&
      entry.sectorId === state.sectorId &&
      entry.categoryId === state.categoryId &&
      entry.subcategoryId === state.subcategoryId
  );
}

export function buildLanguageMenu(language: LanguageCode): string {
  const messages = {
    mg: "Safidy fiteny\n1. Malagasy\n2. Français",
    fr: "Choisissez votre langue\n1. Malagasy\n2. Français"
  };
  return messages[language];
}

export function buildRegionMenu(language: LanguageCode): string {
  const header = language === "mg" ? "Safidy faritany" : "Choisissez une région";
  const options = regions
    .map((region, index) => `${index + 1}. ${getLocalizedLabel(region.name, language)}`)
    .join("\n");
  return `${header}\n${options}\n0. Hiverina / Retour`;
}

export function buildSectorMenu(regionId: string, language: LanguageCode): string {
  const region = regions.find((entry) => entry.id === regionId);
  const available = getSectorsForRegion(regionId);
  const header = language === "mg" ? `Safidy fidirana ho an'ny ${region ? getLocalizedLabel(region.name, language) : "faritany"}` : `Choisissez une filière pour ${region ? getLocalizedLabel(region.name, language) : "la région"}`;
  if (available.length === 0) {
    const noSectorMessage = language === "mg" ? `Tsy misy fidirana ho an'ny faritany ${region ? getLocalizedLabel(region.name, language) : "voafantina"}.` : `Aucune filière n'est disponible pour la région ${region ? getLocalizedLabel(region.name, language) : "sélectionnée"}.`;
    return `${noSectorMessage}\n0. Hiverina / Retour`;
  }

  const options = available.map((sector, index) => `${index + 1}. ${getLocalizedLabel(sector.name, language)}`).join("\n");
  return `${header}\n${options}\n0. Hiverina / Retour`;
}

export function buildCategoryMenu(sectorId: string, language: LanguageCode): string {
  const sector = sectors.find((entry) => entry.id === sectorId);
  const available = getCategoriesForSector(sectorId);
  const header = language === "mg" ? `Safidy sokajy ho an'ny ${sector ? getLocalizedLabel(sector.name, language) : "fidirana"}` : `Choisissez une catégorie pour ${sector ? getLocalizedLabel(sector.name, language) : "cette filière"}`;
  if (available.length === 0) {
    const noCategory = language === "mg" ? `Tsy misy sokajy azo alaina ho an'ny ${sector ? getLocalizedLabel(sector.name, language) : "fidirana"}.` : `Aucune catégorie n'est disponible pour ${sector ? getLocalizedLabel(sector.name, language) : "cette filière"}.`;
    return `${noCategory}\n0. Hiverina / Retour`;
  }

  const options = available.map((category, index) => `${index + 1}. ${getLocalizedLabel(category.name, language)}`).join("\n");
  return `${header}\n${options}\n0. Hiverina / Retour`;
}

export function buildSubcategoryMenu(categoryId: string, language: LanguageCode): string {
  const category = categories.find((entry) => entry.id === categoryId);
  const available = getSubcategoriesForCategory(categoryId);
  const header = language === "mg" ? `Safidy zana-sokajy ho an'ny ${category ? getLocalizedLabel(category.name, language) : "sokajy"}` : `Choisissez une sous-catégorie pour ${category ? getLocalizedLabel(category.name, language) : "cette catégorie"}`;
  if (available.length === 0) {
    const noSub = language === "mg" ? `Tsy misy torohevitra azo alaina amin'ity sokajy ity.` : `Aucune sous-catégorie n'est disponible pour cette catégorie.`;
    return `${noSub}\n0. Hiverina / Retour`;
  }

  const options = available.map((subcategory, index) => `${index + 1}. ${getLocalizedLabel(subcategory.name, language)}`).join("\n");
  return `${header}\n${options}\n0. Hiverina / Retour`;
}

export function buildAdviceText(state: ConsultationState, language: LanguageCode): string {
  const region = regions.find((entry) => entry.id === state.regionId);
  const sector = sectors.find((entry) => entry.id === state.sectorId);
  const category = categories.find((entry) => entry.id === state.categoryId);
  const subcategory = subcategories.find((entry) => entry.id === state.subcategoryId);
  const entry = adviceEntries.find(
    (item) =>
      item.regionId === state.regionId &&
      item.sectorId === state.sectorId &&
      item.categoryId === state.categoryId &&
      item.subcategoryId === state.subcategoryId
  );

  if (!entry) {
    const missing = language === "mg" ? "Tsy misy torohevitra azo omena ao anatin'ity safidy ity." : "Aucun conseil n'est disponible pour cette sélection.";
    return `${missing}\n${getAdviceActionMenu(language)}`;
  }

  const prompt = language === "mg" ? "Torohevitra" : "Conseil";
  const title = [region ? getLocalizedLabel(region.name, language) : "", sector ? getLocalizedLabel(sector.name, language) : "", category ? getLocalizedLabel(category.name, language) : "", subcategory ? getLocalizedLabel(subcategory.name, language) : ""]
    .filter(Boolean)
    .join(" - ");

  const adviceText = getAdviceText(entry, "ussd", language) || getLocalizedLabel(entry.content ?? { mg: "", fr: "" }, language);

  return `${prompt}: ${title}\n${adviceText}\n${getAdviceActionMenu(language)}`;
}

export function normalizePath(rawText: string): string[] {
  return rawText
    .trim()
    .split("*")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

export function processConsultationPath(rawText: string): ConsultationResult {
  const steps = normalizePath(rawText);
  const language = resolveLanguageChoice(steps[0]);
  const trail = language ? steps.slice(1) : steps;

  if (steps.length === 0) {
    return {
      stage: "language",
      message: buildLanguageMenu("mg"),
      endSession: false,
      state: {}
    };
  }

  if (!language && trail.length === 0) {
    return {
      stage: "error",
      message: "Choix indisponible. Sélectionnez 1 pour le malagasy ou 2 pour le français.",
      endSession: false,
      state: {}
    };
  }

  const selectedLanguage = language ?? "mg";

  if (trail.length === 0) {
    return {
      stage: "region",
      message: buildRegionMenu(selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage }
    };
  }

  if (trail.length === 1 && trail[0] === "0") {
    return {
      stage: "language",
      message: buildLanguageMenu(selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage }
    };
  }

  const regionChoice = trail[0];
  const region = getRegionByIndex(regionChoice);
  if (!region) {
    return {
      stage: "error",
      message: selectedLanguage === "mg" ? "Safidy faritany tsy misy. Andramo indray." : "Région invalide. Veuillez réessayer.",
      endSession: false,
      state: { language: selectedLanguage }
    };
  }

  if (trail.length === 1) {
    return {
      stage: "sector",
      message: buildSectorMenu(region.id, selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id }
    };
  }

  if (trail.length >= 2 && trail[1] === "0") {
    return {
      stage: "region",
      message: buildRegionMenu(selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage }
    };
  }

  const sectorChoice = trail[1];
  const sector = getSectorByIndex(region.id, sectorChoice);
  if (!sector) {
    return {
      stage: "error",
      message: selectedLanguage === "mg" ? "Safidy fidirana tsy misy. Andramo indray." : "Filière invalide. Veuillez réessayer.",
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id }
    };
  }

  if (trail.length === 2) {
    return {
      stage: "category",
      message: buildCategoryMenu(sector.id, selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id }
    };
  }

  if (trail.length >= 3 && trail[2] === "0") {
    return {
      stage: "sector",
      message: buildSectorMenu(region.id, selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id }
    };
  }

  const categoryChoice = trail[2];
  const category = getCategoryByIndex(sector.id, categoryChoice);
  if (!category) {
    return {
      stage: "error",
      message: selectedLanguage === "mg" ? "Sokajy tsy misy. Andramo indray." : "Catégorie invalide. Veuillez réessayer.",
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id }
    };
  }

  if (trail.length === 3) {
    return {
      stage: "subcategory",
      message: buildSubcategoryMenu(category.id, selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id, categoryId: category.id }
    };
  }

  if (trail.length >= 4 && trail[3] === "0") {
    return {
      stage: "category",
      message: buildCategoryMenu(sector.id, selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id }
    };
  }

  const subcategoryChoice = trail[3];
  const subcategory = getSubcategoryByIndex(category.id, subcategoryChoice);
  if (!subcategory) {
    return {
      stage: "error",
      message: selectedLanguage === "mg" ? "Zana-sokajy tsy misy. Andramo indray." : "Sous-catégorie invalide. Veuillez réessayer.",
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id, categoryId: category.id }
    };
  }

  if (trail.length === 4) {
    return {
      stage: "advice",
      message: buildAdviceText({ language: selectedLanguage, regionId: region.id, sectorId: sector.id, categoryId: category.id, subcategoryId: subcategory.id }, selectedLanguage),
      endSession: false,
      state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id, categoryId: category.id, subcategoryId: subcategory.id }
    };
  }

  if (trail.length >= 5) {
    const action = trail[4];
    const adviceState = {
      language: selectedLanguage,
      regionId: region.id,
      sectorId: sector.id,
      categoryId: category.id,
      subcategoryId: subcategory.id
    };

    if (action === "1") {
      return {
        stage: "advice",
        message: buildAdviceText(adviceState, selectedLanguage),
        endSession: false,
        state: adviceState
      };
    }

    if (action === "0") {
      return {
        stage: "subcategory",
        message: buildSubcategoryMenu(category.id, selectedLanguage),
        endSession: false,
        state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id, categoryId: category.id }
      };
    }

    if (action === "9") {
      const farewell = selectedLanguage === "mg"
        ? "Misaotra. Hijaorina amin'ny fanampiana hafa any aoriana."
        : "Merci. À bientôt pour une autre aide agricole.";

      return {
        stage: "advice",
        message: farewell,
        endSession: true,
        state: adviceState
      };
    }

    return {
      stage: "advice",
      message: `${getUssdInvalidChoiceMessage(selectedLanguage)}\n${buildAdviceText(adviceState, selectedLanguage)}`,
      endSession: false,
      state: adviceState
    };
  }

  return {
    stage: "error",
    message: selectedLanguage === "mg" ? "Safidy tsy misy. Andramo indray." : "Choix indisponible. Veuillez réessayer.",
    endSession: false,
    state: { language: selectedLanguage, regionId: region.id, sectorId: sector.id, categoryId: category.id, subcategoryId: subcategory.id }
  };
}
