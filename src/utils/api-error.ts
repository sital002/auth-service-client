export class AuthSDKError extends Error {
  type: "network" | "validation" | "server" | "unknown";
  details?: unknown;

  constructor(type: AuthSDKError["type"], message: string, details?: unknown) {
    super(message);
    this.type = type;
    this.details = details;
  }
}
