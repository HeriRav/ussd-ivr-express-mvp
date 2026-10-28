import type { Request, Response } from "express";
import type { ProcessIvrInput } from "../../application/use-cases/process-ivr-input";
import type { StartIvrCall } from "../../application/use-cases/start-ivr-call";
import {
  mapIvrChoiceToTwiml,
  mapIvrMenuToTwiml,
} from "../mappers/twiml-mapper";

export interface IvrPresentationConfig {
  publicBaseUrl?: string;
  welcomeAudioAvailable: boolean;
}

function sendTwiml(res: Response, document: string): void {
  res.status(200).type("text/xml").send(document);
}

export function createIvrControllers(
  startCall: StartIvrCall,
  processInput: ProcessIvrInput,
  config: IvrPresentationConfig,
) {
  const baseUrl = config.publicBaseUrl?.replace(/\/+$/, "");
  const routeUrl = (path: string): string =>
    baseUrl ? `${baseUrl}${path}` : path;
  const audioUrl =
    baseUrl && config.welcomeAudioAvailable
      ? `${baseUrl}/audio/welcome.wav`
      : undefined;

  return {
    voice: (req: Request, res: Response): void => {
      const callSid =
        typeof req.body?.CallSid === "string" ? req.body.CallSid : undefined;
      const menu = startCall.execute(callSid);
      sendTwiml(
        res,
        mapIvrMenuToTwiml(menu, routeUrl("/ivr/gather"), audioUrl),
      );
    },
    gather: (req: Request, res: Response): void => {
      const digit = req.body?.Digits;
      const callSid =
        typeof req.body?.CallSid === "string" ? req.body.CallSid : "default";
      if (digit !== undefined && typeof digit !== "string") {
        res
          .status(400)
          .json({ error: "Invalid IVR request: Digits must be a string" });
        return;
      }

      const choice = processInput.execute(callSid, digit ?? "");
      sendTwiml(res, mapIvrChoiceToTwiml(choice, routeUrl("/ivr/voice")));
    },
    status: (_req: Request, res: Response): void => {
      res.sendStatus(204);
    },
  };
}
