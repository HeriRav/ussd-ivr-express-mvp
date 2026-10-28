import { Router } from "express";
import type { ProcessIvrInput } from "../../application/use-cases/process-ivr-input";
import type { StartIvrCall } from "../../application/use-cases/start-ivr-call";
import {
  createIvrControllers,
  type IvrPresentationConfig
} from "../controllers/ivr-controller";

export function createIvrRouter(
  startCall: StartIvrCall,
  processInput: ProcessIvrInput,
  config: IvrPresentationConfig
): Router {
  const router = Router();
  const controllers = createIvrControllers(startCall, processInput, config);

  router.post("/voice", controllers.voice);
  router.post("/gather", controllers.gather);
  router.post("/status", controllers.status);
  return router;
}
