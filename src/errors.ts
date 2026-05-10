export class AppHttpError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppHttpError";
  }
}

export function isAppHttpError(error: unknown): error is AppHttpError {
  return error instanceof AppHttpError;
}
