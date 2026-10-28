import type { SimulationFilter, SimulationRecord } from "../../domain/models/simulation";
import type { SimulationRepository } from "../../infrastructure/repositories/simulations-repository";

export class GetSimulationsUseCase {
  constructor(private readonly repository: SimulationRepository) {}

  execute(filter?: SimulationFilter): SimulationRecord[] {
    return this.repository.list(filter);
  }
}
