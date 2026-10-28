import type {
  CreateSimulationHistoryInput,
  SimulationHistoryEntry
} from "../../domain/models/simulation";
import type { SimulationRepository } from "../../infrastructure/repositories/simulations-repository";

export class CreateSimulationHistoryUseCase {
  constructor(private readonly repository: SimulationRepository) {}

  execute(input: CreateSimulationHistoryInput): SimulationHistoryEntry {
    return this.repository.recordHistory(input);
  }
}
