import type { SimulationRecord } from "../../domain/models/simulation";
import type { SimulationRepository } from "../../infrastructure/repositories/simulations-repository";

export class GetSimulationByIdUseCase {
  constructor(private readonly repository: SimulationRepository) {}

  execute(id: string): SimulationRecord | undefined {
    return this.repository.findById(id);
  }
}
