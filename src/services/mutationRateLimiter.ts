import { AppHttpError } from "../errors.js";

export interface MutationRateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export interface MutationRateLimitDecision {
  scope: string;
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: string;
  retryAfterSeconds: number;
  windowMs: number;
}

interface Bucket {
  count: number;
  resetAtMs: number;
}

export class MutationRateLimiter {
  private readonly buckets = new Map<string, Bucket>();

  constructor(private readonly options: MutationRateLimitOptions) {}

  consume(scope: string, nowMs = Date.now()): MutationRateLimitDecision {
    const normalizedScope = normalizeScope(scope);
    const bucket = this.getBucket(normalizedScope, nowMs);
    const allowed = bucket.count < this.options.maxRequests;
    if (allowed) {
      bucket.count += 1;
    }

    return {
      scope: normalizedScope,
      allowed,
      limit: this.options.maxRequests,
      remaining: Math.max(this.options.maxRequests - bucket.count, 0),
      resetAt: new Date(bucket.resetAtMs).toISOString(),
      retryAfterSeconds: Math.max(Math.ceil((bucket.resetAtMs - nowMs) / 1000), 1),
      windowMs: this.options.windowMs,
    };
  }

  private getBucket(scope: string, nowMs: number): Bucket {
    const existing = this.buckets.get(scope);
    if (existing && existing.resetAtMs > nowMs) {
      return existing;
    }

    const fresh = {
      count: 0,
      resetAtMs: nowMs + this.options.windowMs,
    };
    this.buckets.set(scope, fresh);
    return fresh;
  }
}

export function assertMutationAllowed(decision: MutationRateLimitDecision): void {
  if (decision.allowed) {
    return;
  }

  throw new AppHttpError(429, "MUTATION_RATE_LIMITED", "Too many mutation requests in the current window", {
    scope: decision.scope,
    limit: decision.limit,
    remaining: decision.remaining,
    resetAt: decision.resetAt,
    retryAfterSeconds: decision.retryAfterSeconds,
    windowMs: decision.windowMs,
  });
}

export function mutationScope(action: string, actor: string): string {
  return `${action}:${normalizeScope(actor)}`;
}

function normalizeScope(scope: string): string {
  const normalized = scope.trim().toLowerCase();
  return normalized.length > 0 ? normalized.slice(0, 160) : "anonymous";
}
