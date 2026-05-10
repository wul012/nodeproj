export type SourceState = "online" | "offline" | "degraded";

export interface ProbeResult {
  name: string;
  state: SourceState;
  sampledAt: string;
  latencyMs?: number;
  message?: string;
  details?: unknown;
}

export interface OpsSnapshot {
  sampledAt: string;
  node: {
    state: SourceState;
    uptimeSeconds: number;
    pid: number;
    version: string;
  };
  javaOrderPlatform: ProbeResult;
  miniKv: ProbeResult;
}

export interface UpstreamJsonResponse<T = unknown> {
  statusCode: number;
  latencyMs: number;
  data: T;
}
