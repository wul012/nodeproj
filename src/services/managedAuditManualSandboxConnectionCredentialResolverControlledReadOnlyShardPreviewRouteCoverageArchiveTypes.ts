import type {
  ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot {
  snapshotVersion: "Node v622";
  inputVerificationVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageVerification["verificationVersion"];
  snapshotState: "ready-for-read-only-handoff-route-coverage-archive" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchive: boolean;
  coverageDigestValue: string;
  snapshotDigest: {
    algorithm: "sha256";
    scope: "handoff-route-coverage-archive-snapshot";
    value: string;
    coveredSectionCount: number;
  };
  archivedSections: string[];
  archivedSectionCount: number;
  verificationGateCount: number;
  verificationPassedGateCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerificationGates {
  snapshotReady: boolean;
  snapshotDigestPresent: boolean;
  archivedSectionsComplete: boolean;
  verificationGatesPreserved: boolean;
  noRoutingActivationRequired: boolean;
  noFreshSiblingEvidenceRequired: boolean;
  readOnlyVerificationOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerification {
  verificationVersion: "Node v623";
  inputSnapshotVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveSnapshot["snapshotVersion"];
  verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification" | "blocked";
  readyForReadOnlyHandoffRouteCoverageArchiveVerification: boolean;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixHandoffRouteCoverageArchiveVerificationGates;
  blockedReasonCodes: string[];
  snapshotDigestValue: string;
  archivedSectionCount: number;
  verificationGateCount: number;
  verificationPassedGateCount: number;
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
