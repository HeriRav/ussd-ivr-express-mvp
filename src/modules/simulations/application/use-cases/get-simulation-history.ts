import type {
  SimulationHistoryEntry,
  SimulationHistoryFilter
} from "../../domain/models/simulation";
import type { SimulationRepository } from "../../infrastructure/repositories/simulations-repository";

export class GetSimulationHistoryUseCase {
  constructor(private readonly repository: SimulationRepository) {}

  execute(filter?: SimulationHistoryFilter): SimulationHistoryEntry[] {
    return this.repository.listHistory(filter);
  }
}
