import {
  buildLanguageMenu,
  buildRegionMenu,
  buildSectorMenu,
  buildCategoryMenu,
  buildSubcategoryMenu,
  buildAdviceText,
  resolveLanguageChoice,
  getRegionByIndex,
  getSectorByIndex,
  getCategoryByIndex,
  getSubcategoryByIndex,
  type LanguageCode,
  type ConsultationState
} from "../../../shared/domain/consultation-flow";
import {
  getAdviceActionMenu,
  getIvrInvalidChoiceMessage,
  getIvrTimeoutMessage
} from "../../../shared/data/agricultural-data";

export interface IvrMenu {
  greeting: string;
  options: readonly { digit: string; label: string }[];
  timeoutSeconds: number;
  timeoutMessage: string;
}

export type IvrSessionState = {
  language?: LanguageCode;
  regionId?: string;
  sectorId?: string;
  categoryId?: string;
  subcategoryId?: string;
  stage: "language" | "region" | "sector" | "category" | "subcategory" | "advice";
  invalidAttempts: number;
  timeoutRepeats: number;
};

export type IvrChoice =
  | { kind: "language-selection"; language: LanguageCode; state: ConsultationState }
  | { kind: "region-selection"; language: LanguageCode; state: ConsultationState }
  | { kind: "sector-selection"; language: LanguageCode; state: ConsultationState }
  | { kind: "category-selection"; language: LanguageCode; state: ConsultationState }
  | { kind: "subcategory-selection"; language: LanguageCode; state: ConsultationState }
  | { kind: "advice"; language: LanguageCode; state: ConsultationState }
  | { kind: "advice-menu"; language: LanguageCode; state: ConsultationState }
  | { kind: "timeout"; language: LanguageCode; state: ConsultationState; message: string }
  | { kind: "callback-demo" }
  | { kind: "goodbye"; language?: LanguageCode }
  | { kind: "invalid"; language: LanguageCode; state: ConsultationState; message: string };

const menu: IvrMenu = {
  greeting: "Bienvenue sur notre service vocal. Choisissez votre langue. Pour le malagasy, tapez 1. Pour le français, tapez 2.",
  options: [
    { digit: "1", label: "Malagasy" },
    { digit: "2", label: "Français" }
  ],
  timeoutSeconds: 7,
  timeoutMessage: "Nous n'avons pas reçu votre choix. Au revoir."
};

export function getIvrMenu(): IvrMenu {
  return menu;
}

function getCurrentState(session?: Partial<IvrSessionState>): ConsultationState {
  return {
    language: session?.language,
    regionId: session?.regionId,
    sectorId: session?.sectorId,
    categoryId: session?.categoryId,
    subcategoryId: session?.subcategoryId
  };
}

export function processIvrChoice(digit: string, session?: IvrSessionState): IvrChoice {
  const state = session ?? {
    stage: "language",
    invalidAttempts: 0,
    timeoutRepeats: 0,
    language: "mg"
  };
  const language = state.language ?? "mg";
  const normalized = digit.trim();

  if (!normalized) {
    if (state.stage === "advice") {
      return { kind: "advice-menu", language, state: getCurrentState(state) };
    }

    return {
      kind: "timeout",
      language,
      state: getCurrentState(state),
      message: getIvrTimeoutMessage(language)
    };
  }

  switch (state.stage) {
    case "language": {
      const selected = resolveLanguageChoice(normalized) ?? (normalized === "1" ? "mg" : normalized === "2" ? "fr" : undefined);
      if (!selected) {
        return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
      }
      return { kind: "language-selection", language: selected, state: { language: selected } };
    }
    case "region": {
      const region = getRegionByIndex(normalized);
      if (!region) {
        return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
      }
      return { kind: "region-selection", language, state: { language, regionId: region.id } };
    }
    case "sector": {
      const sector = state.regionId ? getSectorByIndex(state.regionId, normalized) : undefined;
      if (!sector) {
        return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
      }
      return { kind: "sector-selection", language, state: { language, regionId: state.regionId, sectorId: sector.id } };
    }
    case "category": {
      const category = state.sectorId ? getCategoryByIndex(state.sectorId, normalized) : undefined;
      if (!category) {
        return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
      }
      return { kind: "category-selection", language, state: { language, regionId: state.regionId, sectorId: state.sectorId, categoryId: category.id } };
    }
    case "subcategory": {
      const subcategory = state.categoryId ? getSubcategoryByIndex(state.categoryId, normalized) : undefined;
      if (!subcategory) {
        return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
      }
      return { kind: "subcategory-selection", language, state: { language, regionId: state.regionId, sectorId: state.sectorId, categoryId: state.categoryId, subcategoryId: subcategory.id } };
    }
    case "advice": {
      switch (normalized) {
        case "1":
          return { kind: "advice", language, state: getCurrentState(state) };
        case "0":
          return { kind: "subcategory-selection", language, state: { language, regionId: state.regionId, sectorId: state.sectorId, categoryId: state.categoryId, subcategoryId: state.subcategoryId } };
        case "9":
          return { kind: "goodbye", language };
        default:
          return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
      }
    }
    default:
      return { kind: "invalid", language, state: getCurrentState(state), message: getIvrInvalidChoiceMessage(language) };
  }
}

export function getAdviceOptionsForIvr(language: LanguageCode): string {
  return getAdviceActionMenu(language);
}
