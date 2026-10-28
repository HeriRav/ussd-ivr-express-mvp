import {
  getIvrMenu,
  type IvrMenu,
  type IvrSessionState
} from "../../domain/services/ivr-menu";

export class StartIvrCall {
  private readonly sessions = new Map<string, IvrSessionState>();

  execute(callSid?: string): IvrMenu {
    const key = callSid ?? "default";
    const state = this.sessions.get(key) ?? {
      stage: "language",
      invalidAttempts: 0,
      timeoutRepeats: 0,
      language: "mg"
    };

    this.sessions.set(key, state);
    return getIvrMenu();
  }
}
