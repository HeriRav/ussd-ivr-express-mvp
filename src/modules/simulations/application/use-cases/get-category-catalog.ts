import type { CategoryCatalogEntry } from "../../domain/models/simulation";
import type { SimulationRepository } from "../../infrastructure/repositories/simulations-repository";

export class GetCategoryCatalogUseCase {
  constructor(private readonly repository: SimulationRepository) {}

  execute(): CategoryCatalogEntry[] {
    return this.repository.listCategories();
  }
}
