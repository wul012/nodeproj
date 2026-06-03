import type {
  ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveTypes.js";

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffNote {
  order: number;
  audience: "operator" | "node" | "java" | "miniKv";
  message: string;
  actionRequired: boolean;
  routingActivationAllowed: false;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes {
  notesVersion: "Node v608";
  inputSummaryExportVersion: ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport["exportVersion"];
  handoffState: "ready-for-read-only-handoff" | "blocked";
  readyForReadOnlyHandoff: boolean;
  handoffDigest: {
    algorithm: "sha256";
    scope: "read-only-handoff-notes";
    value: string;
    coveredNoteCount: number;
  };
  noteCount: number;
  actionRequiredCount: number;
  notes: ControlledReadOnlyShardPreviewSourceMatrixHandoffNote[];
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export type ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience =
  ControlledReadOnlyShardPreviewSourceMatrixHandoffNote["audience"];

export interface ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary {
  summaryVersion: "Node v611";
  inputNotesVersion: ControlledReadOnlyShardPreviewSourceMatrixHandoffNotes["notesVersion"];
  summaryState: "ready-for-read-only-handoff-summary" | "blocked";
  readyForReadOnlyHandoffSummary: boolean;
  audiences: ControlledReadOnlyShardPreviewSourceMatrixHandoffAudience[];
  audienceCount: number;
  actionRequiredCount: number;
  handoffDigestValue: string;
  summaryDigest: {
    algorithm: "sha256";
    scope: "read-only-handoff-summary";
    value: string;
    coveredAudienceCount: number;
    coveredActionRequiredCount: number;
  };
  requiresApproval: false;
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
