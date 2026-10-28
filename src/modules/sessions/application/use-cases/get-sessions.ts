import type { SessionFilter, SessionState } from "../../domain/models/session";
import type { SessionRepository } from "../../infrastructure/repositories/sessions-repository";

export class GetSessionsUseCase {
  constructor(private readonly repository: SessionRepository) {}

  execute(filter?: SessionFilter): SessionState[] {
    return this.repository.list(filter);
  }
}
