import type {
  ManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver read-only cross-project readiness runner",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Runner state", profile.runnerState],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node contract", profile.sourceNodeContractVersion],
      ["Java evidence", profile.sourceJavaVersion],
      ["mini-kv receipt", profile.sourceMiniKvVersion],
      ["Target prerequisite id", profile.targetPrerequisiteId],
      ["Ready for read-only cross-project readiness report", profile.readyForReadOnlyCrossProjectReadinessReport],
      ["Ready for final prerequisite closure review", profile.readyForFinalPrerequisiteClosureReview],
      ["Ready for runtime shell implementation", profile.readyForRuntimeShellImplementation],
      ["Execution allowed", profile.executionAllowed],
      ["Credential value read", profile.credentialValueRead],
      ["Raw endpoint URL parsed", profile.rawEndpointUrlParsed],
      ["HTTP request sent", profile.httpRequestSent],
      ["TCP connection attempted", profile.tcpConnectionAttempted],
      ["Java SQL execution allowed", profile.javaSqlExecutionAllowed],
      ["Rollback execution allowed", profile.rollbackExecutionAllowed],
      ["mini-kv write command allowed", profile.miniKvWriteCommandAllowed],
      ["Automatic upstream start", profile.automaticUpstreamStart],
      ["Readiness digest", profile.readinessDigest],
    ],
    sections: [
      {
        heading: "Source Node v326",
        lines: [
          `- Contract state: ${profile.sourceNodeV326.contractState}`,
          `- Ready for contract intake: ${profile.sourceNodeV326.readyForContractIntake}`,
          `- Required field count: ${profile.sourceNodeV326.requiredFieldCount}`,
          `- Prohibited field count: ${profile.sourceNodeV326.prohibitedFieldCount}`,
          `- No-go boundary count: ${profile.sourceNodeV326.noGoBoundaryCount}`,
          `- Implementation still blocked: ${profile.sourceNodeV326.implementationStillBlocked}`,
        ],
      },
      {
        heading: "Java v150 Evidence",
        lines: [
          `- Evidence path: ${profile.javaV150Evidence.evidenceFile.path}`,
          `- Resolved path: ${profile.javaV150Evidence.evidenceFile.resolvedPath}`,
          `- Evidence present: ${profile.javaV150Evidence.evidencePresent}`,
          `- Digest: ${profile.javaV150Evidence.evidenceFile.digest ?? "missing"}`,
          `- Read-only echo documented: ${profile.javaV150Evidence.readOnlyEchoDocumented}`,
          `- SQL / rollback / ledger / network denied: ${profile.javaV150Evidence.sqlRollbackLedgerNetworkDenied}`,
          `- Runtime / provider / client denied: ${profile.javaV150Evidence.noRuntimeProviderClientDocumented}`,
          `- Automatic upstream start denied: ${profile.javaV150Evidence.noAutomaticUpstreamStartDocumented}`,
          `- Ready for Node consumption: ${profile.javaV150Evidence.readyForNodeConsumption}`,
        ],
      },
      {
        heading: "mini-kv v142 Receipt",
        lines: [
          `- Receipt path: ${profile.miniKvV142Receipt.evidenceFile.path}`,
          `- Resolved path: ${profile.miniKvV142Receipt.evidenceFile.resolvedPath}`,
          `- Evidence present: ${profile.miniKvV142Receipt.evidencePresent}`,
          `- Digest: ${profile.miniKvV142Receipt.evidenceFile.digest ?? "missing"}`,
          `- Receipt version: ${profile.miniKvV142Receipt.receiptVersion ?? "missing"}`,
          `- Release version: ${profile.miniKvV142Receipt.releaseVersion ?? "missing"}`,
          `- Read only: ${profile.miniKvV142Receipt.readOnly}`,
          `- Execution allowed: ${profile.miniKvV142Receipt.executionAllowed}`,
          `- Restore execution allowed: ${profile.miniKvV142Receipt.restoreExecutionAllowed}`,
          `- mini-kv write command allowed: ${profile.miniKvV142Receipt.miniKvWriteCommandAllowed}`,
          `- LOAD/RESTORE/COMPACT executed: ${profile.miniKvV142Receipt.loadRestoreCompactExecuted}`,
          `- SETNXEX allowed: ${profile.miniKvV142Receipt.setnxexExecutionAllowed}`,
          `- Abort/rollback authority: ${profile.miniKvV142Receipt.abortRollbackAuthority}`,
          `- Consumes Node v326: ${profile.miniKvV142Receipt.consumesNodeV326}`,
          `- Ready for Node v327: ${profile.miniKvV142Receipt.readyForNodeV327}`,
          `- Ready for Node consumption: ${profile.miniKvV142Receipt.readyForNodeConsumption}`,
        ],
      },
      {
        heading: "Side Effect Safety Matrix",
        lines: Object.entries(profile.sideEffectSafetyMatrix).map(([key, value]) => `- ${key}: ${value}`),
      },
      {
        heading: "Checks",
        lines: Object.entries(profile.checks).map(([key, value]) => `- ${key}: ${value}`),
      },
      {
        heading: "Summary",
        lines: [
          `- Checks: ${profile.summary.passedCheckCount}/${profile.summary.checkCount}`,
          `- Java snippets: ${profile.summary.javaMatchedSnippetCount}/${profile.summary.javaSnippetCount}`,
          `- mini-kv receipt files: ${profile.summary.miniKvReceiptFileCount}`,
          `- Side effects closed: ${profile.summary.sideEffectClosedCount}/${profile.summary.sideEffectTotalCount}`,
          `- Production blockers: ${profile.summary.productionBlockerCount}`,
          `- Warnings: ${profile.summary.warningCount}`,
          `- Recommendations: ${profile.summary.recommendationCount}`,
        ],
      },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}
