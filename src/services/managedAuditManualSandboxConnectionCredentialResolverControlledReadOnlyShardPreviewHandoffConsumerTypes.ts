import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerGates {
  inputSummaryReady: boolean;
  summaryDigestPresent: boolean;
  summaryDigestScopeDeclared: boolean;
  allAudiencesCovered: boolean;
  noActionRequired: boolean;
  readOnlyConsumerOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer {
  consumerVersion: "Node v613";
  inputSummaryVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary["summaryVersion"];
  decision: "ready-for-read-only-summary-consumption" | "blocked";
  readyForReadOnlySummaryConsumption: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerGates;
  blockedReasonCodes: string[];
  summaryDigestValue: string;
  summaryDigestScope: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary["summaryDigest"]["scope"];
  coveredAudienceCount: number;
  actionRequiredCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport {
  exportVersion: "Node v614";
  inputConsumerVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer["consumerVersion"];
  exportState: "ready-for-read-only-summary-consumer-export" | "blocked";
  readyForReadOnlySummaryConsumerExport: boolean;
  consumerDecision: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer["decision"];
  summaryDigestValue: string;
  exportDigest: {
    algorithm: "sha256";
    scope: "handoff-summary-consumer-export-lines";
    value: string;
    coveredLineCount: number;
  };
  exportLines: string[];
  exportLineCount: number;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt {
  receiptVersion: "Node v615";
  inputExportVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport["exportVersion"];
  receiptState: "ready-for-read-only-summary-consumer-receipt" | "blocked";
  readyForReadOnlySummaryConsumerReceipt: boolean;
  exportState: ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport["exportState"];
  exportDigestValue: string;
  receiptDigest: {
    algorithm: "sha256";
    scope: "handoff-summary-consumer-receipt";
    value: string;
    coveredExportLineCount: number;
    coveredBlockedReasonCount: number;
  };
  receiptLines: string[];
  receiptLineCount: number;
  exportLineCount: number;
  blockedReasonCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
