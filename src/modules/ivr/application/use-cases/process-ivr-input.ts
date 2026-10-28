import {
  processIvrChoice,
  type IvrChoice,
  type IvrSessionState
} from "../../domain/services/ivr-menu";

export class ProcessIvrInput {
  private readonly sessions = new Map<string, IvrSessionState>();

  execute(digit: string): IvrChoice;
  execute(callSid: string, digit: string): IvrChoice;
  execute(first: string, second?: string): IvrChoice {
    const callSid = second !== undefined ? first : "default";
    const digit = second !== undefined ? second : first;
    const current = this.sessions.get(callSid) ?? {
      stage: "language",
      invalidAttempts: 0,
      timeoutRepeats: 0,
      language: "mg"
    };

    const choice = processIvrChoice(digit, current);

    if (choice.kind === "goodbye") {
      this.sessions.delete(callSid);
      return choice;
    }

    if (choice.kind === "language-selection") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        stage: "region",
        invalidAttempts: 0,
        timeoutRepeats: 0
      });
    } else if (choice.kind === "region-selection") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        regionId: choice.state.regionId,
        stage: "sector",
        invalidAttempts: 0,
        timeoutRepeats: 0
      });
    } else if (choice.kind === "sector-selection") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        regionId: choice.state.regionId,
        sectorId: choice.state.sectorId,
        stage: "category",
        invalidAttempts: 0,
        timeoutRepeats: 0
      });
    } else if (choice.kind === "category-selection") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        regionId: choice.state.regionId,
        sectorId: choice.state.sectorId,
        categoryId: choice.state.categoryId,
        stage: "subcategory",
        invalidAttempts: 0,
        timeoutRepeats: 0
      });
    } else if (choice.kind === "subcategory-selection") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        regionId: choice.state.regionId,
        sectorId: choice.state.sectorId,
        categoryId: choice.state.categoryId,
        subcategoryId: choice.state.subcategoryId,
        stage: "advice",
        invalidAttempts: 0,
        timeoutRepeats: 0
      });
    } else if (choice.kind === "advice") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        regionId: choice.state.regionId,
        sectorId: choice.state.sectorId,
        categoryId: choice.state.categoryId,
        subcategoryId: choice.state.subcategoryId,
        stage: "advice",
        invalidAttempts: 0,
        timeoutRepeats: 0
      });
    } else if (choice.kind !== "callback-demo") {
      this.sessions.set(callSid, {
        ...current,
        language: choice.language,
        regionId: choice.state.regionId,
        sectorId: choice.state.sectorId,
        categoryId: choice.state.categoryId,
        subcategoryId: choice.state.subcategoryId,
        invalidAttempts: current.invalidAttempts + 1,
        timeoutRepeats: current.timeoutRepeats + (choice.kind === "timeout" ? 1 : 0),
        stage: current.stage
      });
    }

    return choice;
  }
}
