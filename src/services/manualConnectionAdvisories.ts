// Design: static operator guidance is data, while readiness decisions stay
// inside each verification service. Both profiles share one message contract.

export type ManualConnectionMessageSource =
  | "managed-audit-manual-sandbox-connection-packet-verification"
  | "managed-audit-manual-sandbox-connection-preflight-verification"
  | "node-v228-operator-packet"
  | "node-v230-preflight-gate"
  | "java-v87-marker"
  | "java-v88-preflight-echo-marker"
  | "mini-kv-v96-marker"
  | "mini-kv-v97-no-start-guard"
  | "runtime-config";

export interface ManualConnectionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: ManualConnectionMessageSource;
  message: string;
}

interface ManualConnectionAdvisories {
  warnings: ManualConnectionMessage[];
  recommendations: ManualConnectionMessage[];
}

export function addManualBlocker(
  messages: ManualConnectionMessage[],
  condition: boolean,
  code: string,
  source: ManualConnectionMessageSource,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

export function packetAdvisories(): ManualConnectionAdvisories {
  return {
    warnings: [
      {
        code: "PACKET_VERIFICATION_ONLY_NO_CONNECTION",
        severity: "warning",
        source: "managed-audit-manual-sandbox-connection-packet-verification",
        message: "This profile verifies packet evidence only; it does not connect to managed audit.",
      },
      {
        code: "UPSTREAM_MARKERS_ARE_READ_ONLY",
        severity: "warning",
        source: "managed-audit-manual-sandbox-connection-packet-verification",
        message: "Java v87 and mini-kv v96 are consumed as read-only marker evidence, not as execution approvals.",
      },
    ],
    recommendations: [
      {
        code: "START_POST_V229_PLAN",
        severity: "recommendation",
        source: "managed-audit-manual-sandbox-connection-packet-verification",
        message: "Open a new plan before any manual sandbox connection rehearsal attempt.",
      },
      {
        code: "KEEP_SANDBOX_CONNECTION_MANUAL",
        severity: "recommendation",
        source: "managed-audit-manual-sandbox-connection-packet-verification",
        message: "Keep any future sandbox connection manual, credential-handle-only, and separated from production audit.",
      },
    ],
  };
}

export function preflightAdvisories(): ManualConnectionAdvisories {
  return {
    warnings: [
      {
        code: "PREFLIGHT_VERIFICATION_ONLY_NO_CONNECTION",
        severity: "warning",
        source: "managed-audit-manual-sandbox-connection-preflight-verification",
        message: "This profile verifies preflight fields only; it does not open a sandbox managed audit connection.",
      },
      {
        code: "UPSTREAM_MARKERS_ARE_READ_ONLY",
        severity: "warning",
        source: "managed-audit-manual-sandbox-connection-preflight-verification",
        message: "Java v88 and mini-kv v97 are consumed as read-only markers, not as execution approvals.",
      },
    ],
    recommendations: [
      {
        code: "START_POST_V231_PLAN",
        severity: "recommendation",
        source: "managed-audit-manual-sandbox-connection-preflight-verification",
        message: "Open a post-v231 plan before any manual sandbox connection rehearsal runbook or adapter connection attempt.",
      },
      {
        code: "KEEP_PREFLIGHT_AND_CONNECTION_SEPARATE",
        severity: "recommendation",
        source: "managed-audit-manual-sandbox-connection-preflight-verification",
        message: "Keep preflight verification separate from a later manual connection rehearsal and from production audit.",
      },
    ],
  };
}
