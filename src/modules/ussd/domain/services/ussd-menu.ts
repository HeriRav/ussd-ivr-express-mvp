import {
  processConsultationPath,
  type ConsultationResult,
  buildLanguageMenu,
  resolveLanguageChoice
} from "../../../shared/domain/consultation-flow";

export interface UssdReply {
  message: string;
  endSession: boolean;
}

export function processUssdMenu(text: string): UssdReply {
  const raw = text?.trim() ?? "";
  const result: ConsultationResult = processConsultationPath(raw);

  if (result.endSession) {
    return {
      message: result.message,
      endSession: true
    };
  }

  const language = resolveLanguageChoice(raw.split("*")[0]);
  const ussdMessage = language ? result.message : result.message;

  return {
    message: ussdMessage,
    endSession: false
  };
}
