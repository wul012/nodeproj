import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
} from "../services/historicalEvidenceResolver.js";
import type {
  VerificationSnippetMatch,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";

export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification.v1";

export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification";

export const NODE_V258_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review";

export const ACTIVE_PLAN = "docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md";

export const JAVA_V104_RUNBOOK = "D:/javaproj/advanced-order-platform/c/104/解释/说明.md";

export const JAVA_V104_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/107-version-104-sandbox-endpoint-handle-preflight-echo-marker.md";

export const JAVA_V104_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointHandlePreflightEchoMarkerBuilder.java";

export const MINI_KV_V113_RECEIPT = "D:/C/mini-kv/fixtures/release/sandbox-endpoint-handle-non-participation-receipt.json";

export const MINI_KV_V113_RUNBOOK = "D:/C/mini-kv/c/113/解释/说明.md";

export const MINI_KV_V113_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/169-version-113-sandbox-endpoint-handle-non-participation-receipt.md";

export function readJsonObject(filePath: string): Record<string, unknown> {
  if (!historicalEvidenceExists(filePath)) {
    return {};
  }
  const parsed: unknown = JSON.parse(readHistoricalEvidenceFile(filePath, "utf8"));
  return isRecord(parsed) ? parsed : {};
}

export function objectField(input: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = input[key];
  return isRecord(value) ? value : {};
}

export function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

export function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

export function booleanField(input: Record<string, unknown>, key: string): boolean | null {
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}
