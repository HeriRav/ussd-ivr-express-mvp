export interface AppConfig {
  port: number;
  publicBaseUrl?: string;
}

export function loadConfig(
  environment: NodeJS.ProcessEnv = process.env
): AppConfig {
  const rawPort = environment.PORT ?? "3000";
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  const configuredBaseUrl = environment.PUBLIC_BASE_URL?.trim();
  if (!configuredBaseUrl) {
    return { port };
  }

  let parsedBaseUrl: URL;
  try {
    parsedBaseUrl = new URL(configuredBaseUrl);
  } catch {
    throw new Error("PUBLIC_BASE_URL must be a valid HTTPS URL");
  }

  if (
    parsedBaseUrl.protocol !== "https:" ||
    !parsedBaseUrl.hostname ||
    parsedBaseUrl.username ||
    parsedBaseUrl.password ||
    parsedBaseUrl.search ||
    parsedBaseUrl.hash
  ) {
    throw new Error(
      "PUBLIC_BASE_URL must be a valid HTTPS URL without credentials, query, or fragment"
    );
  }

  return {
    port,
    publicBaseUrl: configuredBaseUrl.replace(/\/+$/, "")
  };
}
