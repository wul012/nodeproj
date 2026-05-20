import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  ApprovalRequiredImplementationBoundaryReadiness,
  ApprovalRequiredImplementationReadinessReview,
  ApprovalRequiredImplementationReadinessReviewChecks,
  ApprovalRequiredImplementationReadinessReviewMessage,
  ApprovalRequiredImplementationReadinessSourceNodeV275,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review";
const NODE_V275_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v280-post-status-routes-quality-roadmap.md";

const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

const REQUIREMENT_BY_BOUNDARY: Record<
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode
> = {
  PLAN_DOCUMENT: "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
  CREDENTIAL_HANDLE: "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  ENDPOINT_HANDLE: "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  DISABLED_SECRET_PROVIDER_STUB: "SECRET_PROVIDER_STUB_MISSING",
  OPERATOR_APPROVAL: "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  ROLLBACK_BOUNDARY: "ROLLBACK_BOUNDARY_MISSING",
  REDACTION_POLICY: "REDACTION_POLICY_MISSING",
  EXTERNAL_REQUEST_SIMULATION: "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
  SCHEMA_MIGRATION_POLICY: "SCHEMA_MIGRATION_POLICY_MISSING",
  AUDIT_LEDGER_WRITE_POLICY: "AUDIT_LEDGER_WRITE_POLICY_MISSING",
};

const READINESS_BLUEPRINTS = {
  CREDENTIAL_HANDLE: {
    owner: "security",
    artifacts: [
      "credential-handle-review-id",
      "credential-value-redaction-contract",
      "operator-visible-secret-value-prohibition",
    ],
    java: "Echo credential handle review id without credential value fields.",
    miniKv: "Confirm no credential value load/store/include behavior.",
    node: "Verify handle-only evidence and value-redaction invariants.",
    prohibited: ["read-credential-value", "store-credential-value", "render-credential-value"],
  },
  ENDPOINT_HANDLE: {
    owner: "security",
    artifacts: [
      "endpoint-handle-review-id",
      "allowlist-review-status",
      "raw-endpoint-redaction-contract",
    ],
    java: "Echo endpoint handle and allowlist review status without raw URL.",
    miniKv: "Confirm no raw endpoint parse/include/connect behavior.",
    node: "Verify handle-only endpoint evidence and no raw URL shape drift.",
    prohibited: ["parse-raw-endpoint-url", "render-raw-endpoint-url", "connect-managed-audit"],
  },
  OPERATOR_APPROVAL: {
    owner: "operator",
    artifacts: [
      "operator-identity-binding",
      "approval-correlation-marker",
      "manual-window-open-marker",
    ],
    java: "Echo operator approval marker and manual-window evidence without executing ledger writes.",
    miniKv: "Confirm no auto-start and no approval side effects.",
    node: "Verify operator marker completeness before any later dry-run shell.",
    prohibited: ["execute-without-operator-marker", "auto-approve-operation", "auto-start-upstream"],
  },
  ROLLBACK_BOUNDARY: {
    owner: "release-manager",
    artifacts: [
      "rollback-abort-marker",
      "restore-point-review-id",
      "manual-rollback-runbook-reference",
    ],
    java: "Echo rollback abort marker and restore review id without executing rollback.",
    miniKv: "Confirm no LOAD/RESTORE/COMPACT and no authority over rollback state.",
    node: "Verify rollback guard evidence stays separate from execution.",
    prohibited: ["execute-rollback", "deploy-resolver-without-abort-marker", "write-production-record"],
  },
  SCHEMA_MIGRATION_POLICY: {
    owner: "release-manager",
    artifacts: [
      "schema-migration-rehearsal-id",
      "migration-review-status",
      "sql-execution-prohibition-marker",
    ],
    java: "Echo schema migration rehearsal id without executing SQL.",
    miniKv: "Confirm no admin command or schema/storage mutation participates.",
    node: "Verify schema migration remains review-only.",
    prohibited: ["execute-schema-migration", "execute-sql", "mutate-managed-audit-schema"],
  },
  AUDIT_LEDGER_WRITE_POLICY: {
    owner: "node",
    artifacts: [
      "approval-ledger-write-policy-id",
      "audit-store-write-prohibition-marker",
      "write-path-owner-review",
    ],
    java: "Echo ledger write policy id without writing approval ledger.",
    miniKv: "Confirm no storage/backend/write participation.",
    node: "Verify all write paths stay blocked until an explicit later plan.",
    prohibited: ["write-approval-ledger", "write-managed-audit-state", "write-storage"],
  },
} as const satisfies Record<
  (typeof APPROVAL_REQUIRED_BOUNDARY_CODES)[number],
  {
    owner: ApprovalRequiredImplementationBoundaryReadiness["owner"];
    artifacts: readonly string[];
    java: string;
    miniKv: string;
    node: string;
    prohibited: readonly string[];
  }
>;

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile {
  const sourceNodeV275 = createSourceNodeV275(input.config);
  const boundaryReadiness = createBoundaryReadiness();
  const checks = createChecks(input.config, sourceNodeV275, boundaryReadiness);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview")
      .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview
    ? "credential-resolver-approval-required-implementation-readiness-review-ready"
    : "blocked";
  const readinessReview = createReadinessReview(sourceNodeV275, boundaryReadiness, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval-required implementation readiness review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
    implementationReadinessReviewOnly: true,
    readOnlyImplementationReadinessReview: true,
    readyForJavaV116MiniKvV122Echo:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV275,
    readinessReview,
    boundaryReadiness,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      boundaryCount: boundaryReadiness.length,
      echoReadyBoundaryCount: boundaryReadiness.filter((boundary) =>
        boundary.readyForJavaV116Echo && boundary.readyForMiniKvV122Receipt).length,
      blockedForImplementationBoundaryCount: boundaryReadiness.filter((boundary) =>
        !boundary.readyForRuntimeImplementation).length,
      requiredArtifactCount: boundaryReadiness.reduce((total, boundary) => total + boundary.requiredArtifacts.length, 0),
      javaV116EchoHintCount: boundaryReadiness.filter((boundary) => boundary.javaV116EchoHint.length > 0).length,
      miniKvV122ReceiptHintCount: boundaryReadiness.filter((boundary) =>
        boundary.miniKvV122ReceiptHint.length > 0).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalRequiredImplementationReadinessReviewJson: ROUTE_PATH,
      approvalRequiredImplementationReadinessReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV275Json: NODE_V275_ROUTE,
      sourceNodeV275Markdown: `${NODE_V275_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      recommendedParallelJavaV116: "Java v116 approval-required implementation readiness echo",
      recommendedParallelMiniKvV122: "mini-kv v122 approval-required implementation non-participation readiness receipt",
      nextNodeVerificationVersion: "Node v282",
    },
    nextActions: [
      "Ask Java v116 and mini-kv v122 to run in parallel only after Node v281 is archived.",
      "Keep Java v116 read-only: echo boundary readiness, do not write ledger or execute SQL.",
      "Keep mini-kv v122 non-participating: no resolver, no credential, no raw endpoint, no storage backend, no writes.",
      "After both upstream echoes exist, run Node v282 as the approval-required implementation readiness upstream echo verification.",
      "Do not implement a real resolver, secret provider, raw endpoint parser, HTTP/TCP client, schema migration, ledger write, or auto-start in this stage.",
    ],
  };
}

function createSourceNodeV275(config: AppConfig): ApprovalRequiredImplementationReadinessSourceNodeV275 {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v275",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForApprovalRequiredBoundaryUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    approvalRequiredBoundaryCount: source.summary.approvalRequiredBoundaryCount,
    approvalRequiredBoundaryCodes: source.sourceNodeV274.approvalRequiredBoundaryCodes,
    approvalRequiredRequirementCodes: source.sourceNodeV274.approvalRequiredRequirementCodes,
    approvalRequiredBoundaryScopeAligned: source.echoVerification.approvalRequiredBoundaryScopeAligned,
    approvalRequiredExplanationsAligned: source.echoVerification.approvalRequiredExplanationsAligned,
    prohibitedRuntimeActionsAligned: source.echoVerification.prohibitedRuntimeActionsAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    resolverBoundaryAligned: source.echoVerification.resolverBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createBoundaryReadiness(): ApprovalRequiredImplementationBoundaryReadiness[] {
  return APPROVAL_REQUIRED_BOUNDARY_CODES.map((code) => {
    const blueprint = READINESS_BLUEPRINTS[code];
    return {
      code,
      requirementFromV268: REQUIREMENT_BY_BOUNDARY[code],
      readinessState: "echo-ready-implementation-blocked",
      implementationDisposition: "requires-explicit-follow-up-artifacts",
      owner: blueprint.owner,
      requiredArtifacts: [...blueprint.artifacts],
      javaV116EchoHint: blueprint.java,
      miniKvV122ReceiptHint: blueprint.miniKv,
      nodeV282VerificationHint: blueprint.node,
      prohibitedRuntimeActions: [...blueprint.prohibited],
      readyForJavaV116Echo: true,
      readyForMiniKvV122Receipt: true,
      readyForNodeV282Verification: false,
      readyForRuntimeImplementation: false,
    };
  });
}

function createReadinessReview(
  sourceNodeV275: ApprovalRequiredImplementationReadinessSourceNodeV275,
  boundaryReadiness: ApprovalRequiredImplementationBoundaryReadiness[],
  checks: ApprovalRequiredImplementationReadinessReviewChecks,
): ApprovalRequiredImplementationReadinessReview {
  const review = {
    reviewMode: "node-v281-approval-required-implementation-readiness-review-only",
    sourceSpan: "Node v275",
    readinessStage: "pre-implementation-echo-ready",
    implementationStage: "blocked-until-java-v116-mini-kv-v122-and-node-v282",
    allApprovalRequiredBoundariesEchoReady:
      checks.allBoundariesEchoReadyForJavaV116 && checks.allBoundariesEchoReadyForMiniKvV122,
    allApprovalRequiredBoundariesImplementationBlocked: checks.allBoundariesStillBlockedForRuntimeImplementation,
    allRequiredArtifactsNamed: checks.allRequiredArtifactsNamed,
    javaV116EchoRecommended: true,
    miniKvV122ReceiptRecommended: true,
    nodeV282VerificationRequired: true,
    routeSplitQualityLineClosed: true,
  } as const;

  return {
    ...review,
    reviewDigest: sha256StableJson({
      ...review,
      sourceVerificationDigest: sourceNodeV275.verificationDigest,
      boundaryReadiness,
    }),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV275: ApprovalRequiredImplementationReadinessSourceNodeV275,
  boundaryReadiness: ApprovalRequiredImplementationBoundaryReadiness[],
): ApprovalRequiredImplementationReadinessReviewChecks {
  return {
    sourceNodeV275Ready: sourceNodeV275.readyForApprovalRequiredBoundaryUpstreamEchoVerification,
    sourceBoundaryCountExpected: sourceNodeV275.approvalRequiredBoundaryCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
    sourceBoundaryCodesAligned: arrayEquals(sourceNodeV275.approvalRequiredBoundaryCodes, [
      ...APPROVAL_REQUIRED_BOUNDARY_CODES,
    ]),
    sourceKeepsReadOnlyEchoOnly: sourceNodeV275.verificationState
      === "credential-resolver-approval-required-boundary-upstream-echo-verification-ready",
    sourceKeepsRealResolverBlocked: !sourceNodeV275.realResolverImplementationAllowed
      && !sourceNodeV275.resolverClientInstantiated,
    sourceKeepsCredentialBoundaryClosed: !sourceNodeV275.credentialValueRead
      && !sourceNodeV275.readsManagedAuditCredential
      && !sourceNodeV275.storesManagedAuditCredential,
    sourceKeepsRawEndpointBoundaryClosed: !sourceNodeV275.rawEndpointUrlParsed,
    sourceKeepsConnectionBoundaryClosed: !sourceNodeV275.connectsManagedAudit
      && !sourceNodeV275.externalRequestSent,
    sourceKeepsWriteBoundaryClosed: !sourceNodeV275.executionAllowed
      && !sourceNodeV275.approvalLedgerWritten
      && !sourceNodeV275.schemaMigrationExecuted,
    sourceKeepsAutoStartBoundaryClosed: !sourceNodeV275.automaticUpstreamStart,
    boundaryReadinessCountExpected: boundaryReadiness.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
    allBoundariesEchoReadyForJavaV116: boundaryReadiness.every((boundary) => boundary.readyForJavaV116Echo),
    allBoundariesEchoReadyForMiniKvV122: boundaryReadiness.every((boundary) => boundary.readyForMiniKvV122Receipt),
    allBoundariesStillBlockedForRuntimeImplementation: boundaryReadiness.every((boundary) =>
      !boundary.readyForRuntimeImplementation),
    allRequiredArtifactsNamed: boundaryReadiness.every((boundary) => boundary.requiredArtifacts.length >= 3),
    routeSplitQualityLineClosed: true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview: false,
  };
}

function collectProductionBlockers(
  checks: ApprovalRequiredImplementationReadinessReviewChecks,
): ApprovalRequiredImplementationReadinessReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ApprovalRequiredImplementationReadinessReviewMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV275Ready,
      code: "NODE_V275_APPROVAL_REQUIRED_ECHO_NOT_READY",
      source: "node-v275-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Node v275 approval-required boundary upstream echo verification must be ready before v281.",
    },
    {
      condition:
        checks.sourceBoundaryCountExpected
        && checks.sourceBoundaryCodesAligned
        && checks.boundaryReadinessCountExpected,
      code: "APPROVAL_REQUIRED_BOUNDARY_SET_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review",
      message: "The six approval-required boundaries must remain aligned before requesting Java v116 and mini-kv v122.",
    },
    {
      condition:
        checks.sourceKeepsRealResolverBlocked
        && checks.sourceKeepsCredentialBoundaryClosed
        && checks.sourceKeepsRawEndpointBoundaryClosed
        && checks.sourceKeepsConnectionBoundaryClosed
        && checks.sourceKeepsWriteBoundaryClosed
        && checks.sourceKeepsAutoStartBoundaryClosed,
      code: "SOURCE_RUNTIME_BOUNDARY_OPENED",
      source: "node-v275-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "The source v275 runtime boundary must remain closed while v281 only reviews readiness.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during the approval-required implementation readiness review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during the approval-required implementation readiness review.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): ApprovalRequiredImplementationReadinessReviewMessage[] {
  return [
    {
      code: "IMPLEMENTATION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review",
      message: "v281 is ready for upstream echo only; runtime implementation remains blocked until Java v116, mini-kv v122, and Node v282 exist.",
    },
    {
      code: "ROUTE_SPLIT_QUALITY_LINE_CLOSED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review",
      message: "statusRoutes is below the target, so this version intentionally returns to the credential resolver main flow.",
    },
  ];
}

function collectRecommendations(): ApprovalRequiredImplementationReadinessReviewMessage[] {
  return [
    {
      code: "RUN_JAVA_V116_AND_MINI_KV_V122_IN_PARALLEL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review",
      message: "Java v116 and mini-kv v122 can run in parallel because both consume Node v281 read-only readiness evidence.",
    },
    {
      code: "VERIFY_WITH_NODE_V282_BEFORE_IMPLEMENTATION_DRAFT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review",
      message: "Run Node v282 upstream echo verification before drafting any managed audit resolver implementation plan.",
    },
  ];
}

function arrayEquals<T>(left: readonly T[], right: readonly T[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
