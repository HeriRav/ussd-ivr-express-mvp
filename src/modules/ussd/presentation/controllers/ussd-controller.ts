import type { Request, Response } from "express";
import type { ProcessUssdRequest } from "../../application/use-cases/process-ussd-request";

export function createUssdController(processRequest: ProcessUssdRequest) {
  return (req: Request, res: Response): void => {
    const text = req.body?.text;
    if (text !== undefined && typeof text !== "string") {
      res.status(400).json({ error: "Invalid USSD request: text must be a string" });
      return;
    }

    const result = processRequest.execute(text ?? "");
    res
      .type("text/plain")
      .send(`${result.endSession ? "END" : "CON"} ${result.message}`);
  };
}
