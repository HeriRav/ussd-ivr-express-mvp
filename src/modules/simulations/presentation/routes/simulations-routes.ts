import { Router } from "express";
import type { CreateSimulationHistoryUseCase } from "../../application/use-cases/create-simulation-history";
import type { GetCategoryCatalogUseCase } from "../../application/use-cases/get-category-catalog";
import type { GetSimulationByIdUseCase } from "../../application/use-cases/get-simulation-by-id";
import type { GetSimulationHistoryUseCase } from "../../application/use-cases/get-simulation-history";
import type { GetSimulationsUseCase } from "../../application/use-cases/get-simulations";
import { createSimulationsController } from "../controllers/simulations-controller";

export function createSimulationsRouter(
  getSimulations: GetSimulationsUseCase,
  getSimulationById: GetSimulationByIdUseCase,
  getCategoryCatalog: GetCategoryCatalogUseCase,
  createHistory: CreateSimulationHistoryUseCase,
  getHistory: GetSimulationHistoryUseCase
): Router {
  const router = Router();
  const controller = createSimulationsController(getSimulations, getSimulationById, getCategoryCatalog, createHistory, getHistory);

  router.get("/simulations", controller.getAll);
  router.get("/simulations/categories", controller.getCategories);
  router.get("/simulations/history", controller.getHistory);
  router.post("/simulations/history", controller.createHistory);
  router.get("/simulations/:id", controller.getById);

  return router;
}
