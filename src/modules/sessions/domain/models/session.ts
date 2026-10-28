export type SessionChannel = "USSD" | "IVR";
export type SessionLanguage = "mg" | "fr";
export type SessionStatus = "active" | "completed" | "abandoned" | "expired";

export interface SessionState {
  sessionId: string;
  channel: SessionChannel;
  language: SessionLanguage;
  region?: string;
  sector?: string;
  category?: string;
  subcategory?: string;
  currentStep?: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
}

export type SessionFilter = {
  channel?: SessionChannel;
  language?: SessionLanguage;
  status?: SessionStatus;
  region?: string;
  sector?: string;
};

export interface CreateSessionInput {
  sessionId?: string;
  channel?: SessionChannel;
  language?: SessionLanguage;
  region?: string;
  sector?: string;
  category?: string;
  subcategory?: string;
  currentStep?: string;
  status?: SessionStatus;
}
