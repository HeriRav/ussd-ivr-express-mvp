import type { CreateSessionInput, SessionState } from "../../domain/models/session";
import type { SessionRepository } from "../../infrastructure/repositories/sessions-repository";

export class CreateSessionUseCase {
  constructor(private readonly repository: SessionRepository) {}

  execute(input: CreateSessionInput): SessionState {
    return this.repository.create(input);
  }
}
