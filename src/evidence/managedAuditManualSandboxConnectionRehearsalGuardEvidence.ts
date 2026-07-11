import { createHash } from "node:crypto";

import {
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "../services/historicalEvidenceResolver.js";

export interface RehearsalEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface RehearsalSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

export const ACTIVE_PLAN = "docs/plans/v245-post-sandbox-precheck-roadmap.md";

export const ROUTE_PATH = "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard";

export const NODE_V247_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification";

export const NODE_V248_ROUTE = "/api/v1/audit/managed-audit-sandbox-code-health-pass";

export const NODE_V249_DEPENDABOT = ".github/dependabot.yml";

export const NODE_V249_WORKFLOW = ".github/workflows/node-evidence.yml";

export const NODE_V249_TEST = "test/dependabotConfig.test.ts";

export const NODE_V249_RUNBOOK = "c/249/解释/dependabot-security-maintenance-v249.md";

export const NODE_V249_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段/253-dependabot-security-maintenance-v249.md";

export const JAVA_V101_DEPENDABOT = "D:/javaproj/.github/dependabot.yml";

export const JAVA_V101_WORKFLOW = "D:/javaproj/.github/workflows/maven-ci.yml";

export const JAVA_V101_RUNBOOK = "D:/javaproj/advanced-order-platform/c/101/解释/说明.md";

export const JAVA_V101_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/104-version-101-dependabot-security-maintenance.md";

export const MINI_KV_V110_DEPENDABOT = "D:/C/mini-kv/.github/dependabot.yml";

export const MINI_KV_V110_TEST = "D:/C/mini-kv/tests/dependabot_config_tests.cpp";

export const MINI_KV_V110_RUNBOOK = "D:/C/mini-kv/c/110/解释/说明.md";

export const MINI_KV_V110_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/166-version-110-dependabot-github-actions-maintenance.md";

export function evidenceFile(id: string, filePath: string): RehearsalEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  try {
    const stat = statHistoricalEvidence(filePath);
    return {
      id,
      path: filePath,
      resolvedPath,
      exists: true,
      sizeBytes: stat.size,
      digest: sha256File(filePath),
    };
  } catch {
    return {
      id,
      path: filePath,
      resolvedPath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
}

export function snippet(id: string, filePath: string, expectedText: string): RehearsalSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  let matched = false;
  try {
    matched = readHistoricalEvidenceFile(filePath, "utf8").includes(expectedText);
  } catch {
    // Leave the default false when historical evidence cannot be read.
  }

  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched,
  };
}

export function snippetMatched(snippets: RehearsalSnippetMatch[], id: string): boolean {
  return snippets.some((snippet) => snippet.id === id && snippet.matched);
}

export function sha256File(filePath: string): string {
  return createHash("sha256")
    .update(readHistoricalEvidenceFile(filePath))
    .digest("hex");
}

export function formatEvidenceFile(file: RehearsalEvidenceFile): string {
  return `${file.id}: ${file.path} -> ${file.resolvedPath}; exists=${file.exists}; size=${file.sizeBytes}; digest=${file.digest ?? "missing"}`;
}

export function formatSnippet(snippet: RehearsalSnippetMatch): string {
  return `${snippet.id}: ${snippet.path}; matched=${snippet.matched}; expected=${snippet.expectedText}`;
}
