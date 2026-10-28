import type { SessionState } from "../../domain/models/session";
import type { SessionRepository } from "../../infrastructure/repositories/sessions-repository";

export class GetSessionByIdUseCase {
  constructor(private readonly repository: SessionRepository) {}

  execute(sessionId: string): SessionState | undefined {
    return this.repository.findById(sessionId);
  }
}
