import type { AppConfig } from "../config.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1";
  reviewState: "credential-resolver-approval-required-implementation-readiness-review-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview: boolean;
  implementationReadinessReviewOnly: true;
  readOnlyImplementationReadinessReview: true;
  readyForJavaV116MiniKvV122Echo: boolean;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV275: ApprovalRequiredImplementationReadinessSourceNodeV275;
  readinessReview: ApprovalRequiredImplementationReadinessReview;
  boundaryReadiness: ApprovalRequiredImplementationBoundaryReadiness[];
  checks: ApprovalRequiredImplementationReadinessReviewChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    boundaryCount: number;
    echoReadyBoundaryCount: number;
    blockedForImplementationBoundaryCount: number;
    requiredArtifactCount: number;
    javaV116EchoHintCount: number;
    miniKvV122ReceiptHintCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ApprovalRequiredImplementationReadinessReviewMessage[];
  warnings: ApprovalRequiredImplementationReadinessReviewMessage[];
  recommendations: ApprovalRequiredImplementationReadinessReviewMessage[];
  evidenceEndpoints: {
    approvalRequiredImplementationReadinessReviewJson: string;
    approvalRequiredImplementationReadinessReviewMarkdown: string;
    sourceNodeV275Json: string;
    sourceNodeV275Markdown: string;
    activePlan: string;
    recommendedParallelJavaV116: string;
    recommendedParallelMiniKvV122: string;
    nextNodeVerificationVersion: "Node v282";
  };
  nextActions: string[];
}

export interface ApprovalRequiredImplementationReadinessSourceNodeV275 {
  sourceVersion: "Node v275";
  profileVersion: string;
  verificationState: string;
  readyForApprovalRequiredBoundaryUpstreamEchoVerification: boolean;
  verificationDigest: string;
  sourceSpan: "Node v274 + Java v115 + mini-kv v121";
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  approvalRequiredBoundaryCount: number;
  approvalRequiredBoundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  approvalRequiredRequirementCodes: CredentialResolverPreImplementationRequirementCode[];
  approvalRequiredBoundaryScopeAligned: boolean;
  approvalRequiredExplanationsAligned: boolean;
  prohibitedRuntimeActionsAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface ApprovalRequiredImplementationReadinessReview {
  reviewDigest: string;
  reviewMode: "node-v281-approval-required-implementation-readiness-review-only";
  sourceSpan: "Node v275";
  readinessStage: "pre-implementation-echo-ready";
  implementationStage: "blocked-until-java-v116-mini-kv-v122-and-node-v282";
  allApprovalRequiredBoundariesEchoReady: boolean;
  allApprovalRequiredBoundariesImplementationBlocked: boolean;
  allRequiredArtifactsNamed: boolean;
  javaV116EchoRecommended: true;
  miniKvV122ReceiptRecommended: true;
  nodeV282VerificationRequired: true;
  routeSplitQualityLineClosed: true;
}

export interface ApprovalRequiredImplementationBoundaryReadiness {
  code: CredentialResolverPreImplementationBoundaryCode;
  requirementFromV268: CredentialResolverPreImplementationRequirementCode;
  readinessState: "echo-ready-implementation-blocked";
  implementationDisposition: "requires-explicit-follow-up-artifacts";
  owner: "security" | "operator" | "release-manager" | "node";
  requiredArtifacts: string[];
  javaV116EchoHint: string;
  miniKvV122ReceiptHint: string;
  nodeV282VerificationHint: string;
  prohibitedRuntimeActions: string[];
  readyForJavaV116Echo: true;
  readyForMiniKvV122Receipt: true;
  readyForNodeV282Verification: false;
  readyForRuntimeImplementation: false;
}

export type ApprovalRequiredImplementationReadinessReviewChecks = {
  sourceNodeV275Ready: boolean;
  sourceBoundaryCountExpected: boolean;
  sourceBoundaryCodesAligned: boolean;
  sourceKeepsReadOnlyEchoOnly: boolean;
  sourceKeepsRealResolverBlocked: boolean;
  sourceKeepsCredentialBoundaryClosed: boolean;
  sourceKeepsRawEndpointBoundaryClosed: boolean;
  sourceKeepsConnectionBoundaryClosed: boolean;
  sourceKeepsWriteBoundaryClosed: boolean;
  sourceKeepsAutoStartBoundaryClosed: boolean;
  boundaryReadinessCountExpected: boolean;
  allBoundariesEchoReadyForJavaV116: boolean;
  allBoundariesEchoReadyForMiniKvV122: boolean;
  allBoundariesStillBlockedForRuntimeImplementation: boolean;
  allRequiredArtifactsNamed: boolean;
  routeSplitQualityLineClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview: boolean;
};

export interface ApprovalRequiredImplementationReadinessReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review"
    | "node-v275-credential-resolver-approval-required-boundary-upstream-echo-verification"
    | "runtime-config";
  message: string;
}

export type ApprovalRequiredImplementationReadinessReviewConfig = Pick<
  AppConfig,
  "upstreamProbesEnabled" | "upstreamActionsEnabled"
>;
