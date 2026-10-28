import { Router } from "express";
import type { CreateSessionUseCase } from "../../application/use-cases/create-session";
import type { GetSessionByIdUseCase } from "../../application/use-cases/get-session-by-id";
import type { GetSessionsUseCase } from "../../application/use-cases/get-sessions";
import { createSessionsController } from "../controllers/sessions-controller";

export function createSessionsRouter(
  getSessions: GetSessionsUseCase,
  getSessionById: GetSessionByIdUseCase,
  createSession: CreateSessionUseCase
): Router {
  const router = Router();
  const controller = createSessionsController(getSessions, getSessionById, createSession);

  router.get("/sessions", controller.getAll);
  router.get("/sessions/:id", controller.getById);
  router.post("/sessions", controller.create);

  return router;
}
