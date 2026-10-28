import type { IvrChoice, IvrMenu } from "../../domain/services/ivr-menu";
import {
  adviceEntries,
  categories,
  getAdviceActionMenu,
  getAdviceText,
  getIvrInvalidChoiceMessage,
  getLocalizedLabel,
  regions,
  sectors,
  subcategories
} from "../../../shared/data/agricultural-data";
import {
  getRegionByIndex,
  getSectorByIndex,
  getCategoryByIndex
} from "../../../shared/domain/consultation-flow";

function xmlEscape(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;"
    };
    return entities[character] ?? character;
  });
}

function response(body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`;
}

function say(language: string, value: string): string {
  return `<Say language="${language}">${xmlEscape(value)}</Say>`;
}

export function mapIvrMenuToTwiml(
  menu: IvrMenu,
  gatherUrl: string,
  audioUrl?: string
): string {
  const greeting = audioUrl
    ? `<Play>${xmlEscape(audioUrl)}</Play>`
    : say("fr-FR", menu.greeting);
  const options = menu.options
    .map((option) => xmlEscape(option.label))
    .join(" ");

  return response(`
    ${greeting}
    <Gather input="dtmf" numDigits="1" timeout="${menu.timeoutSeconds}" action="${xmlEscape(gatherUrl)}" method="POST">
      <Say language="fr-FR">${options}</Say>
    </Gather>
    <Say language="fr-FR">${xmlEscape(menu.timeoutMessage)}</Say>
    <Hangup/>
  `);
}

export function mapIvrChoiceToTwiml(
  choice: IvrChoice,
  voiceUrl: string
): string {
  switch (choice.kind) {
    case "language-selection": {
      const text = choice.language === "mg"
        ? "Langue sélectionnée : Malagasy. Choisissez une région."
        : "Langue sélectionnée : Français. Choisissez une région.";
      return response(`${say("fr-FR", text)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "region-selection": {
      const text = "Région sélectionnée. Choisissez une filière.";
      return response(`${say("fr-FR", text)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "sector-selection": {
      const sector = choice.state.sectorId ? sectors.find((entry) => entry.id === choice.state.sectorId) : undefined;
      const text = sector ? `Filière sélectionnée : ${getLocalizedLabel(sector.name, choice.language)}. Choisissez une catégorie.` : "Choisissez une catégorie.";
      return response(`${say("fr-FR", text)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "category-selection": {
      const category = choice.state.categoryId ? categories.find((entry) => entry.id === choice.state.categoryId) : undefined;
      const text = category ? `Catégorie sélectionnée : ${getLocalizedLabel(category.name, choice.language)}. Choisissez une sous-catégorie.` : "Choisissez une sous-catégorie.";
      return response(`${say("fr-FR", text)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "subcategory-selection": {
      const subcategory = choice.state.subcategoryId ? subcategories.find((entry) => entry.id === choice.state.subcategoryId) : undefined;
      const text = subcategory ? `Sous-catégorie sélectionnée : ${getLocalizedLabel(subcategory.name, choice.language)}.` : "Sous-catégorie sélectionnée.";
      return response(`${say("fr-FR", text)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "advice": {
      const entry = adviceEntries.find((item) => item.regionId === choice.state.regionId && item.sectorId === choice.state.sectorId && item.categoryId === choice.state.categoryId && item.subcategoryId === choice.state.subcategoryId);
      const text = entry ? getAdviceText(entry, "ivr", choice.language) || "Aucun conseil n'est disponible pour cette sélection." : "Aucun conseil n'est disponible pour cette sélection.";
      const optionsText = getAdviceActionMenu(choice.language).replace(/\n/g, " ");
      return response(`${say("fr-FR", `${text} ${optionsText}`)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "advice-menu": {
      const optionsText = getAdviceActionMenu(choice.language).replace(/\n/g, " ");
      return response(`${say("fr-FR", optionsText)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    }
    case "callback-demo":
      return response(`${say("fr-FR", "La demande de rappel est simulée en mode démonstration et n'a pas été enregistrée.")}<Hangup/>`);
    case "goodbye":
      return response(`${say("fr-FR", choice.language === "mg" ? "Misaotra. Haja velona." : "Merci et à bientôt.")}<Hangup/>`);
    case "timeout":
      return response(`${say("fr-FR", choice.message)}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
    case "invalid":
      return response(`${say("fr-FR", choice.message ?? getIvrInvalidChoiceMessage(choice.language))}<Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>`);
  }
}
