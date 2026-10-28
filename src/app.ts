import express, { type Express } from "express";
import path from "node:path";
import type { ProcessIvrInput } from "./modules/ivr/application/use-cases/process-ivr-input";
import type { StartIvrCall } from "./modules/ivr/application/use-cases/start-ivr-call";
import { createIvrRouter } from "./modules/ivr/presentation/routes/ivr-routes";
import { CreateSessionUseCase } from "./modules/sessions/application/use-cases/create-session";
import { GetSessionByIdUseCase } from "./modules/sessions/application/use-cases/get-session-by-id";
import { GetSessionsUseCase } from "./modules/sessions/application/use-cases/get-sessions";
import { InMemorySessionRepository, type SessionRepository } from "./modules/sessions/infrastructure/repositories/sessions-repository";
import { createSessionsRouter } from "./modules/sessions/presentation/routes/sessions-routes";
import { CreateSimulationHistoryUseCase } from "./modules/simulations/application/use-cases/create-simulation-history";
import { GetCategoryCatalogUseCase } from "./modules/simulations/application/use-cases/get-category-catalog";
import { GetSimulationByIdUseCase } from "./modules/simulations/application/use-cases/get-simulation-by-id";
import { GetSimulationHistoryUseCase } from "./modules/simulations/application/use-cases/get-simulation-history";
import { GetSimulationsUseCase } from "./modules/simulations/application/use-cases/get-simulations";
import { InMemorySimulationRepository, type SimulationRepository } from "./modules/simulations/infrastructure/repositories/simulations-repository";
import { createSimulationsRouter } from "./modules/simulations/presentation/routes/simulations-routes";
import type { ProcessUssdRequest } from "./modules/ussd/application/use-cases/process-ussd-request";
import { createUssdRouter } from "./modules/ussd/presentation/routes/ussd-routes";
import { httpErrorHandler } from "./shared/presentation/http-error-handler";

export interface AppDependencies {
  processUssdRequest: ProcessUssdRequest;
  startIvrCall: StartIvrCall;
  processIvrInput: ProcessIvrInput;
  simulationsRepository?: SimulationRepository;
  sessionsRepository?: SessionRepository;
  publicBaseUrl?: string;
  welcomeAudioAvailable: boolean;
}

export function createApp(dependencies: AppDependencies): Express {
  const app = express();
  const simulationsRepository = dependencies.simulationsRepository ?? new InMemorySimulationRepository();
  const sessionsRepository = dependencies.sessionsRepository ?? new InMemorySessionRepository();
  const getSimulations = new GetSimulationsUseCase(simulationsRepository);
  const getSimulationById = new GetSimulationByIdUseCase(simulationsRepository);
  const getCategoryCatalog = new GetCategoryCatalogUseCase(simulationsRepository);
  const createSimulationHistory = new CreateSimulationHistoryUseCase(simulationsRepository);
  const getSimulationHistory = new GetSimulationHistoryUseCase(simulationsRepository);
  const getSessions = new GetSessionsUseCase(sessionsRepository);
  const getSessionById = new GetSessionByIdUseCase(sessionsRepository);
  const createSession = new CreateSessionUseCase(sessionsRepository);

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    "/audio",
    express.static(path.join(process.cwd(), "public", "audio"))
  );

  app.get("/", (_req, res) => {
    res.json({
      name: "USSD + IVR Express MVP",
      status: "ok",
      endpoints: {
        health: "/health",
        ussd: "POST /ussd",
        ivrVoice: "POST /ivr/voice",
        ivrGather: "POST /ivr/gather",
        ivrStatus: "POST /ivr/status",
        simulations: "GET /api/simulations",
        simulationById: "GET /api/simulations/:id",
        categories: "GET /api/simulations/categories",
        history: "GET /api/simulations/history",
        createHistory: "POST /api/simulations/history",
        sessions: "GET /api/sessions",
        sessionById: "GET /api/sessions/:id",
        createSession: "POST /api/sessions"
      }
    });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/ussd", createUssdRouter(dependencies.processUssdRequest));
  app.use(
    "/ivr",
    createIvrRouter(
      dependencies.startIvrCall,
      dependencies.processIvrInput,
      dependencies
    )
  );
  app.use(
    "/api",
    createSimulationsRouter(
      getSimulations,
      getSimulationById,
      getCategoryCatalog,
      createSimulationHistory,
      getSimulationHistory
    )
  );
  app.use(
    "/api",
    createSessionsRouter(
      getSessions,
      getSessionById,
      createSession
    )
  );
  app.use(httpErrorHandler);

  return app;
}
