import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { CrossProjectReadinessReport } from "./crossProjectReadinessTypes.js";

export interface CrossProjectReadinessArtifactPaths {
  jsonPath: string;
  markdownPath: string;
}

export async function writeCrossProjectReadinessReport(
  report: CrossProjectReadinessReport,
  outputDirectory: string,
): Promise<CrossProjectReadinessArtifactPaths> {
  await mkdir(outputDirectory, { recursive: true });
  const jsonPath = join(outputDirectory, "cross-project-readiness.json");
  const markdownPath = join(outputDirectory, "cross-project-readiness.md");
  await writeAtomic(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await writeAtomic(markdownPath, renderCrossProjectReadinessMarkdown(report));
  return { jsonPath, markdownPath };
}

export function renderCrossProjectReadinessMarkdown(report: CrossProjectReadinessReport): string {
  const lines = [
    "# Cross-project readiness",
    "",
    `- Generated: \`${report.generated_at}\``,
    `- Live requested: \`${report.live_requested}\``,
    `- Overall status: **${report.overall_status.toUpperCase()}**`,
    `- Read only: \`${report.read_only}\``,
    `- Execution allowed: \`${report.execution_allowed}\``,
    "",
    "## Requirements",
    "",
    "| Requirement | Status | Check | Result |",
    "|---|---|---|---|",
  ];

  for (const requirement of report.requirements) {
    for (const check of requirement.checks) {
      lines.push(
        `| ${requirement.id} ${escapeCell(requirement.title)} | ${requirement.status.toUpperCase()} | `
          + `${escapeCell(check.id)} | ${check.status.toUpperCase()}: ${escapeCell(check.summary)} |`,
      );
    }
  }

  lines.push(
    "",
    "## Provenance",
    "",
    `- Node runtime: \`${report.provenance.node_runtime}\``,
    `- Java commit: \`${report.provenance.java_commit ?? "not supplied"}\``,
    `- mini-kv commit: \`${report.provenance.mini_kv_commit ?? "not supplied"}\``,
    "",
    "The JSON companion contains process identifiers, artifact digests, fresh-output digests, schema fields, and cleanup evidence.",
  );
  return `${lines.join("\n")}\n`;
}

async function writeAtomic(path: string, content: string): Promise<void> {
  const temporaryPath = `${path}.partial-${process.pid}`;
  try {
    await writeFile(temporaryPath, content, "utf8");
    await rename(temporaryPath, path);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\r", " ").replaceAll("\n", " ");
}
