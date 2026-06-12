import type {
  JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight.js";
import {
  renderVerificationReportMarkdown,
} from "./verificationReportBuilder.js";

export function renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightMarkdown(
  profile: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke preflight",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Preflight state", profile.preflightState],
      ["Ready for preflight", profile.readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight],
      ["Ready for live smoke execution", profile.readyForRouteCatalogCleanupLatestSiblingLiveSmokeExecution],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Planned execution version", profile.plannedExecutionVersion],
      ["Preflight only", profile.preflightOnly],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Archive Verification", entries: profile.sourceArchiveVerification },
      { heading: "Live Smoke Window", entries: profile.liveSmokeWindow },
      { heading: "Node Smoke Environment", entries: profile.nodeSmokeEnvironment },
      { heading: "Process Plan", lines: profile.processPlan.flatMap((step) => [
        `- ${step.id}`,
        `  - Project: ${step.project}`,
        `  - Owner: ${step.owner}`,
        `  - CWD: ${step.cwd}`,
        `  - Host: ${step.host}`,
        `  - Port: ${step.port}`,
        `  - Start command: ${step.startCommand}`,
        `  - Readiness probe: ${step.readinessProbe}`,
        `  - Stop policy: ${step.stopPolicy}`,
        `  - Cleanup verification: ${step.cleanupVerification}`,
        `  - Fail closed: ${step.failClosedRule}`,
      ]) },
      { heading: "Read Targets", lines: profile.readTargets.flatMap((target) => [
        `- ${target.id}`,
        `  - Project: ${target.project}`,
        `  - Protocol: ${target.protocol}`,
        `  - Method or command: ${target.methodOrCommand}`,
        `  - Target: ${target.target}`,
        `  - Expected evidence: ${target.expectedEvidence}`,
        `  - Read only: ${target.readOnly}`,
        `  - Mutates state: ${target.mutatesState}`,
      ]) },
      { heading: "Command Policy", entries: profile.commandPolicy },
      { heading: "Summary", entries: profile.summary },
      { heading: "Checks", entries: profile.checks },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
