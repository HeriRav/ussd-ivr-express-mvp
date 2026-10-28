import { Router } from "express";
import type { ProcessUssdRequest } from "../../application/use-cases/process-ussd-request";
import { createUssdController } from "../controllers/ussd-controller";

export function createUssdRouter(processRequest: ProcessUssdRequest): Router {
  const router = Router();
  router.post("/", createUssdController(processRequest));
  return router;
}
