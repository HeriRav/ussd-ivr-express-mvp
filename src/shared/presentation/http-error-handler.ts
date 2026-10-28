import type { ErrorRequestHandler } from "express";

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

function isHttpError(error: unknown): error is HttpError {
  return error instanceof Error;
}

export const httpErrorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next
): void => {
  const status =
    isHttpError(error) && (error.statusCode ?? error.status) === 400
      ? 400
      : 500;

  if (status === 500) {
    console.error("Unhandled request error:", error);
  }

  res.status(status).json({
    error: status === 400 ? "Malformed request body" : "Internal server error"
  });
};
