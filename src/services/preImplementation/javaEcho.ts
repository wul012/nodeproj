import {
  evidenceFile,
  snippet,
  snippetMatched,
} from "../historicalEvidenceReportUtils.js";
import {
  BOUNDARY_CODES,
  JAVA_V112_BUILDER,
  JAVA_V112_EVIDENCE_SERVICE,
  JAVA_V112_RECORDS,
  JAVA_V112_RUNBOOK,
  JAVA_V112_SUPPORT,
  JAVA_V112_WALKTHROUGH,
  REQUIREMENT_CODES,
  codeToSnippetId,
  requirementToSnippetId,
} from "./evidence.js";
import type { JavaV112PlanEcho } from "./types.js";

type SnippetSpec = readonly [id: string, path: string, text: string];
type SnippetMatcher = (id: string) => boolean;

const JAVA_SNIPPETS: readonly SnippetSpec[] = [
  ["java-v112-plan", JAVA_V112_RUNBOOK, "Node v270 pre-implementation plan intake"],
  ["java-v112-node-v270", JAVA_V112_SUPPORT, "Node v270 credential resolver pre-implementation plan intake"],
  ["java-v112-node-v272", JAVA_V112_SUPPORT, "Node v272"],
  ["java-v112-receipt-version", JAVA_V112_EVIDENCE_SERVICE, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.v1"],
  ["java-v112-echo-mode", JAVA_V112_SUPPORT, "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt-only"],
  ["java-v112-profile", JAVA_V112_EVIDENCE_SERVICE, "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1"],
  ["java-v112-state", JAVA_V112_EVIDENCE_SERVICE, "credential-resolver-pre-implementation-plan-intake-ready"],
  ["java-v112-check-count", JAVA_V112_SUPPORT, "static final int CHECK_COUNT = 26"],
  ["java-v112-passed-count", JAVA_V112_SUPPORT, "static final int PASSED_CHECK_COUNT = 26"],
  ["java-v112-source-count", JAVA_V112_SUPPORT, "static final int SOURCE_CHECK_COUNT = 22"],
  ["java-v112-boundary-count", JAVA_V112_SUPPORT, "static final int REQUIRED_BOUNDARY_COUNT = 10"],
  ["java-v112-production-blockers", JAVA_V112_SUPPORT, "static final int PRODUCTION_BLOCKER_COUNT = 0"],
  ["java-v112-plan-document", JAVA_V112_SUPPORT, "PLAN_DOCUMENT"],
  ["java-v112-credential-handle", JAVA_V112_SUPPORT, "CREDENTIAL_HANDLE"],
  ["java-v112-endpoint-handle", JAVA_V112_SUPPORT, "ENDPOINT_HANDLE"],
  ["java-v112-secret-provider", JAVA_V112_SUPPORT, "DISABLED_SECRET_PROVIDER_STUB"],
  ["java-v112-operator-approval", JAVA_V112_SUPPORT, "OPERATOR_APPROVAL"],
  ["java-v112-rollback", JAVA_V112_SUPPORT, "ROLLBACK_BOUNDARY"],
  ["java-v112-redaction", JAVA_V112_SUPPORT, "REDACTION_POLICY"],
  ["java-v112-external-request", JAVA_V112_SUPPORT, "EXTERNAL_REQUEST_SIMULATION"],
  ["java-v112-schema-migration", JAVA_V112_SUPPORT, "SCHEMA_MIGRATION_POLICY"],
  ["java-v112-audit-ledger-policy", JAVA_V112_SUPPORT, "AUDIT_LEDGER_WRITE_POLICY"],
  ["java-v112-req-plan", JAVA_V112_SUPPORT, "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING"],
  ["java-v112-req-credential", JAVA_V112_SUPPORT, "CREDENTIAL_HANDLE_BOUNDARY_MISSING"],
  ["java-v112-req-endpoint", JAVA_V112_SUPPORT, "ENDPOINT_HANDLE_BOUNDARY_MISSING"],
  ["java-v112-req-secret", JAVA_V112_SUPPORT, "SECRET_PROVIDER_STUB_MISSING"],
  ["java-v112-req-operator", JAVA_V112_SUPPORT, "OPERATOR_APPROVAL_BOUNDARY_MISSING"],
  ["java-v112-req-rollback", JAVA_V112_SUPPORT, "ROLLBACK_BOUNDARY_MISSING"],
  ["java-v112-req-redaction", JAVA_V112_SUPPORT, "REDACTION_POLICY_MISSING"],
  ["java-v112-req-external", JAVA_V112_SUPPORT, "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING"],
  ["java-v112-req-schema", JAVA_V112_SUPPORT, "SCHEMA_MIGRATION_POLICY_MISSING"],
  ["java-v112-req-ledger", JAVA_V112_SUPPORT, "AUDIT_LEDGER_WRITE_POLICY_MISSING"],
  ["java-v112-no-credential", JAVA_V112_BUILDER, "credentialValueStillForbidden"],
  ["java-v112-no-raw", JAVA_V112_BUILDER, "rawEndpointStillForbidden"],
  ["java-v112-no-secret", JAVA_V112_BUILDER, "secretProviderRuntimeStillDisabled"],
  ["java-v112-no-client", JAVA_V112_BUILDER, "realResolverClientStillDisabled"],
  ["java-v112-no-connection", JAVA_V112_BUILDER, "externalRequestStillSimulationOnly"],
  ["java-v112-no-ledger", JAVA_V112_BUILDER, "approvalLedgerWritten=false"],
  ["java-v112-no-sql", JAVA_V112_BUILDER, "sqlExecuted"],
  ["java-v112-no-auto", JAVA_V112_BUILDER, "automaticUpstreamStart=false"],
  ["java-v112-ready", JAVA_V112_BUILDER, "readyForNodeV272CredentialResolverPreImplementationPlanVerification"],
  ["java-v112-proof-claims", JAVA_V112_WALKTHROUGH, "proofClaims"],
];

export function createJavaV112Echo(): JavaV112PlanEcho {
  const evidenceFiles = [
    evidenceFile("java-v112-runbook", JAVA_V112_RUNBOOK),
    evidenceFile("java-v112-walkthrough", JAVA_V112_WALKTHROUGH),
    evidenceFile("java-v112-builder", JAVA_V112_BUILDER),
    evidenceFile("java-v112-support", JAVA_V112_SUPPORT),
    evidenceFile("java-v112-records", JAVA_V112_RECORDS),
  ];
  const expectedSnippets = JAVA_SNIPPETS.map(([id, path, text]) => snippet(id, path, text));
  const matched = (id: string) => snippetMatched(expectedSnippets, id);

  const reference: JavaV112PlanEcho = {
    sourceVersion: "Java v112",
    tagLabel: "v112订单平台plan-intake回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.v1",
    echoMode: selectBySnippet(
      matched,
      "java-v112-echo-mode",
      "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt-only",
      "missing",
    ),
    consumedNodeVersion: selectBySnippet(matched, "java-v112-node-v270", "Node v270", "missing"),
    consumedNodeProfile: selectBySnippet(
      matched,
      "java-v112-profile",
      "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1",
      "missing",
    ),
    nextNodeConsumerVersion: selectBySnippet(matched, "java-v112-node-v272", "Node v272", "missing"),
    planIntakeState: selectBySnippet(
      matched,
      "java-v112-state",
      "credential-resolver-pre-implementation-plan-intake-ready",
      "missing",
    ),
    checkCount: selectBySnippet(matched, "java-v112-check-count", 26, 0),
    passedCheckCount: selectBySnippet(matched, "java-v112-passed-count", 26, 0),
    sourceCheckCount: selectBySnippet(matched, "java-v112-source-count", 22, 0),
    sourcePassedCheckCount: selectBySnippet(matched, "java-v112-source-count", 22, 0),
    boundaryCount: selectBySnippet(matched, "java-v112-boundary-count", 10, 0),
    definedBoundaryCount: selectBySnippet(matched, "java-v112-boundary-count", 10, 0),
    missingBoundaryCount: 0,
    productionBlockerCount: selectBySnippet(matched, "java-v112-production-blockers", 0, 1),
    warningCount: 2,
    recommendationCount: 2,
    boundaryCodesEchoed: BOUNDARY_CODES.every((code) => matched(`java-v112-${codeToSnippetId(code)}`)),
    requirementCodesEchoed: REQUIREMENT_CODES.every((code) => matched(requirementToSnippetId(code))),
    planIntakeEchoed: hasPlanEcho(matched),
    sideEffectBoundaryEchoed: hasSideEffectEcho(matched),
    readyForNodeV272Alignment: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    readyForManagedAuditSandboxAdapterConnection: false,
  };
  reference.readyForNodeV272Alignment = isAligned(reference);
  return reference;
}

function selectBySnippet<T>(
  matched: SnippetMatcher,
  id: string,
  present: T,
  missing: T,
): T {
  return matched(id) ? present : missing;
}

function hasPlanEcho(matched: SnippetMatcher): boolean {
  return matched("java-v112-node-v270")
    && matched("java-v112-state")
    && matched("java-v112-ready");
}

function hasSideEffectEcho(matched: SnippetMatcher): boolean {
  return matched("java-v112-no-credential")
    && matched("java-v112-no-raw")
    && matched("java-v112-no-secret")
    && matched("java-v112-no-client")
    && matched("java-v112-no-connection")
    && matched("java-v112-no-ledger")
    && matched("java-v112-no-sql")
    && matched("java-v112-no-auto");
}

function isAligned(reference: JavaV112PlanEcho): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && reference.consumedNodeVersion === "Node v270"
    && reference.nextNodeConsumerVersion === "Node v272"
    && reference.planIntakeState === "credential-resolver-pre-implementation-plan-intake-ready"
    && reference.boundaryCodesEchoed
    && reference.requirementCodesEchoed
    && reference.planIntakeEchoed
    && reference.sideEffectBoundaryEchoed;
}
