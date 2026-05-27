import type {
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationTypes.js";

export interface SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference {
  sourceVersion: "Node v352";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV353DecisionRecord: boolean;
  archiveVerificationDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  checkCount: number;
  passedCheckCount: number;
  inputCount: number;
  closedScopeCount: number;
  productionBlockerCount: number;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  executionAllowed: false;
}

export interface ManagedAuditDisabledReadOnlyIntegrationDecisionNecessityProof {
  blockerResolved: "verified-disabled-intake-needs-explicit-next-stage-decision";
  consumedBy: "Node v354 sandbox handle review prerequisite intake or disabled checkpoint";
  cannotReuseExistingReportBecause: string;
  growthStopCondition: string;
}

export interface ManagedAuditDisabledReadOnlyIntegrationDecisionInput {
  id: string;
  label: string;
  source: "node-v352" | "boundary-policy" | "operator-authorization" | "future-stage";
  requiredForDecision: boolean;
  status: "available" | "closed" | "not-requested";
  notes: string;
}

export interface ManagedAuditDisabledReadOnlyIntegrationDecisionRecord {
  decisionDigest: string;
  decisionMode: "managed-audit-disabled-read-only-integration-decision-record";
  sourceSpan: "Node v352 managed-audit-disabled read-only integration intake archive verification";
  sourceArchiveVerificationDigest: string;
  decision:
    | "advance-to-sandbox-handle-review-prerequisite-intake"
    | "remain-managed-audit-disabled"
    | "blocked";
  decisionReason: string;
  allowsSandboxHandleReviewPreparation: boolean;
  requestsCredentialValue: false;
  requestsRawEndpointUrl: false;
  instantiatesProviderClient: false;
  implementsRuntimeShell: false;
  opensManagedAuditConnection: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v354";
  inputCount: number;
}

export type ManagedAuditDisabledReadOnlyIntegrationDecisionRecordChecks = {
  sourceNodeV352Ready: boolean;
  sourceArchiveVerificationAllowsDecision: boolean;
  sourceArchiveFilesComplete: boolean;
  sourceChecksAllPassed: boolean;
  necessityProofPresent: boolean;
  decisionInputsComplete: boolean;
  decisionDigestStable: boolean;
  decisionLimitedToPrerequisiteIntake: boolean;
  noCredentialValueRequested: boolean;
  noRawEndpointUrlRequested: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplemented: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noJavaMiniKvEchoRequired: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord: boolean;
};

export interface ManagedAuditDisabledReadOnlyIntegrationDecisionRecordSummary {
  checkCount: number;
  passedCheckCount: number;
  inputCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v352"
    | "necessity-proof"
    | "decision-inputs"
    | "decision-record"
    | "runtime-boundary"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-decision-record.v1";
  decisionState: "managed-audit-disabled-read-only-integration-decision-record-ready" | "blocked";
  decision:
    | "advance-to-sandbox-handle-review-prerequisite-intake"
    | "remain-managed-audit-disabled"
    | "blocked";
  readyForManagedAuditDisabledReadOnlyIntegrationDecisionRecord: boolean;
  readyForNodeV354SandboxHandleReviewPrerequisiteIntake: boolean;
  consumesNodeV352ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: true;
  activeNodeVersion: "Node v353";
  sourceNodeVersion: "Node v352";
  decisionRecordOnly: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV352: SourceNodeV352ManagedAuditDisabledReadOnlyIntegrationArchiveVerificationReference;
  necessityProof: ManagedAuditDisabledReadOnlyIntegrationDecisionNecessityProof;
  decisionInputs: ManagedAuditDisabledReadOnlyIntegrationDecisionInput[];
  decisionRecord: ManagedAuditDisabledReadOnlyIntegrationDecisionRecord;
  checks: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordChecks;
  summary: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordSummary;
  productionBlockers: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[];
  warnings: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[];
  recommendations: ManagedAuditDisabledReadOnlyIntegrationDecisionRecordMessage[];
  evidenceEndpoints: {
    managedAuditDisabledReadOnlyIntegrationDecisionRecordJson: string;
    managedAuditDisabledReadOnlyIntegrationDecisionRecordMarkdown: string;
    sourceNodeV352Json: string;
    sourceNodeV352Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
