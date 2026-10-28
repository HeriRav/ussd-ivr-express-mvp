import type { CreateSessionInput, SessionFilter, SessionState } from "../../domain/models/session";

export interface SessionRepository {
  list(filter?: SessionFilter): SessionState[];
  findById(sessionId: string): SessionState | undefined;
  create(input: CreateSessionInput): SessionState;
}

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions = new Map<string, SessionState>();

  list(filter?: SessionFilter): SessionState[] {
    return [...this.sessions.values()]
      .filter((session) => {
        if (filter?.channel && session.channel !== filter.channel) return false;
        if (filter?.language && session.language !== filter.language) return false;
        if (filter?.status && session.status !== filter.status) return false;
        if (filter?.region && session.region && session.region.toUpperCase() !== filter.region.trim().toUpperCase()) return false;
        if (filter?.sector && session.sector && session.sector.toUpperCase() !== filter.sector.trim().toUpperCase()) return false;
        return true;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  findById(sessionId: string): SessionState | undefined {
    return this.sessions.get(sessionId.trim());
  }

  create(input: CreateSessionInput): SessionState {
    const now = new Date().toISOString();
    const sessionId = input.sessionId?.trim() || `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const session: SessionState = {
      sessionId,
      channel: input.channel ?? "USSD",
      language: input.language ?? "fr",
      region: input.region,
      sector: input.sector,
      category: input.category,
      subcategory: input.subcategory,
      currentStep: input.currentStep ?? "language",
      status: input.status ?? "active",
      createdAt: now,
      updatedAt: now
    };

    this.sessions.set(sessionId, session);
    return session;
  }
}
