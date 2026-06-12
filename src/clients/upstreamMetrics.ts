export type UpstreamMetricsClient = "order-platform" | "mini-kv";

export interface UpstreamMetricsEvent {
  client: UpstreamMetricsClient;
  latencyMs: number;
  ok: boolean;
  timeout: boolean;
}

export interface UpstreamMetricsRecorder {
  record(event: UpstreamMetricsEvent): void;
}

export interface UpstreamClientMetricsSnapshot {
  client: UpstreamMetricsClient;
  requests: number;
  errors: number;
  timeouts: number;
  latencyMs: {
    count: number;
    p50: number | null;
    p95: number | null;
    p99: number | null;
    min: number | null;
    max: number | null;
  };
}

export interface UpstreamMetricsSnapshot {
  service: "orderops-node";
  generatedAt: string;
  metricsVersion: "upstream-metrics.v1";
  windowSize: number;
  clients: Record<UpstreamMetricsClient, UpstreamClientMetricsSnapshot>;
}

const CLIENTS: UpstreamMetricsClient[] = ["order-platform", "mini-kv"];

export const noopUpstreamMetricsRecorder: UpstreamMetricsRecorder = {
  record: () => undefined,
};

export class UpstreamMetricsRegistry implements UpstreamMetricsRecorder {
  private readonly counters = new Map<UpstreamMetricsClient, { requests: number; errors: number; timeouts: number }>();
  private readonly latencies = new Map<UpstreamMetricsClient, number[]>();

  constructor(private readonly windowSize = 256) {
    for (const client of CLIENTS) {
      this.counters.set(client, { requests: 0, errors: 0, timeouts: 0 });
      this.latencies.set(client, []);
    }
  }

  record(event: UpstreamMetricsEvent): void {
    const counters = this.counters.get(event.client);
    const latencies = this.latencies.get(event.client);
    if (counters === undefined || latencies === undefined) {
      return;
    }

    counters.requests += 1;
    if (!event.ok) {
      counters.errors += 1;
    }
    if (event.timeout) {
      counters.timeouts += 1;
    }

    latencies.push(normalizeLatency(event.latencyMs));
    while (latencies.length > this.windowSize) {
      latencies.shift();
    }
  }

  snapshot(now = new Date()): UpstreamMetricsSnapshot {
    return {
      service: "orderops-node",
      generatedAt: now.toISOString(),
      metricsVersion: "upstream-metrics.v1",
      windowSize: this.windowSize,
      clients: {
        "order-platform": this.snapshotClient("order-platform"),
        "mini-kv": this.snapshotClient("mini-kv"),
      },
    };
  }

  private snapshotClient(client: UpstreamMetricsClient): UpstreamClientMetricsSnapshot {
    const counters = this.counters.get(client) ?? { requests: 0, errors: 0, timeouts: 0 };
    const latencies = this.latencies.get(client) ?? [];
    return {
      client,
      requests: counters.requests,
      errors: counters.errors,
      timeouts: counters.timeouts,
      latencyMs: summarizeLatency(latencies),
    };
  }
}

export function summarizeLatency(values: number[]): UpstreamClientMetricsSnapshot["latencyMs"] {
  if (values.length === 0) {
    return {
      count: 0,
      p50: null,
      p95: null,
      p99: null,
      min: null,
      max: null,
    };
  }

  const sorted = values.map(normalizeLatency).sort((a, b) => a - b);
  return {
    count: sorted.length,
    p50: percentile(sorted, 0.5),
    p95: percentile(sorted, 0.95),
    p99: percentile(sorted, 0.99),
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
}

function percentile(sortedValues: number[], percentileValue: number): number {
  const index = Math.min(sortedValues.length - 1, Math.max(0, Math.ceil(sortedValues.length * percentileValue) - 1));
  return sortedValues[index];
}

function normalizeLatency(latencyMs: number): number {
  if (!Number.isFinite(latencyMs) || latencyMs < 0) {
    return 0;
  }
  return Math.round(latencyMs);
}
