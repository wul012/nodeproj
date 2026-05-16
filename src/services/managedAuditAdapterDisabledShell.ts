import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditAdapterImplementationPrecheckPacket,
  type ManagedAuditAdapterImplementationPrecheckPacketProfile,
} from "./managedAuditAdapterImplementationPrecheckPacket.js";

export interface ManagedAuditAdapter {
  append(record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult>;
  query(filter: ManagedAuditQueryFilter): Promise<ManagedAuditAdapterQueryResult>;
  digest(): Promise<ManagedAuditAdapterDigestResult>;
  health(): Promise<ManagedAuditAdapterHealthResult>;
  describe(): Promise<ManagedAuditAdapterDescription>;
}

export interface ManagedAuditAppendRecord {
  requestId: string;
  eventType: string;
  payload: Record<string, unknown>;
}

export interface ManagedAuditQueryFilter {
  requestId: string;
  limit?: number;
}

export interface ManagedAuditAdapterAppendResult {
  status: "disabled";
  accepted: false;
  written: false;
  code: "MANAGED_AUDIT_ADAPTER_DISABLED";
  message: string;
}

export interface ManagedAuditAdapterQueryResult {
  status: "disabled";
  records: [];
  recordCount: 0;
  code: "MANAGED_AUDIT_ADAPTER_DISABLED";
}

export interface ManagedAuditAdapterDigestResult {
  status: "disabled";
  digest: string;
  recordCount: 0;
}

export interface ManagedAuditAdapterHealthResult {
  status: "disabled";
  writable: false;
  externalConnectionAttempted: false;
  message: string;
}

export interface ManagedAuditAdapterDescription {
  adapterName: "DisabledManagedAuditAdapter";
  adapterKind: "disabled";
  profileVersion: "managed-audit-adapter-disabled-shell.v1";
  appendEnabled: false;
  queryEnabled: false;
  externalConnectionEnabled: false;
  localDryRunEnabled: false;
}

export interface ManagedAuditAdapterDisabledShellProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-adapter-disabled-shell.v1";
  shellState: "disabled-shell-ready" | "blocked";
  readyForManagedAuditAdapterDisabledShell: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyShell: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  sourcePrecheck: {
    sourceVersion: "Node v219";
    profileVersion: ManagedAuditAdapterImplementationPrecheckPacketProfile["profileVersion"];
    precheckState: ManagedAuditAdapterImplementationPrecheckPacketProfile["precheckState"];
    precheckDigest: string;
    readyForImplementationPrecheck: boolean;
  };
  adapterInterface: {
    name: "ManagedAuditAdapter";
    methodNames: readonly ["append", "query", "digest", "health", "describe"];
    methodCount: 5;
    minimalSurface: true;
  };
  adapterSelection: {
    defaultAdapterKind: "disabled";
    selectedAdapterKind: "disabled";
    acceptedCandidateKinds: readonly ["disabled", "local-dry-run"];
    requestedStoreKind: string;
    auditStoreUrlConfigured: boolean;
    productionExternalUrlAccepted: false;
    localDryRunCandidateDeclared: true;
    localDryRunSelected: false;
    externalManagedAuditAccessed: false;
    localDryRunWritePerformed: false;
    upstreamActionsEnabled: boolean;
  };
  disabledAdapterProbe: {
    descriptionAdapterKind: "disabled";
    healthStatus: "disabled";
    appendStatus: "disabled";
    appendAccepted: false;
    appendWritten: false;
    queryStatus: "disabled";
    queryRecordCount: 0;
    digestStatus: "disabled";
    digest: string;
    externalConnectionAttempted: false;
  };
  checks: {
    sourcePrecheckReady: boolean;
    interfaceMethodSurfaceMinimal: boolean;
    disabledAdapterSelectedByDefault: boolean;
    localDryRunCandidateOnlyDeclared: boolean;
    productionExternalUrlRejected: boolean;
    disabledAppendDoesNotWrite: boolean;
    disabledQueryReturnsNoRecords: boolean;
    disabledHealthReportsDisabled: boolean;
    disabledDescribeReportsDisabled: boolean;
    disabledDigestStable: boolean;
    noLocalDryRunWritePerformed: boolean;
    noExternalManagedAuditAccessed: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditAdapterDisabledShell: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    methodCount: number;
    acceptedCandidateKindCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: DisabledShellMessage[];
  warnings: DisabledShellMessage[];
  recommendations: DisabledShellMessage[];
  evidenceEndpoints: {
    managedAuditAdapterDisabledShellJson: string;
    managedAuditAdapterDisabledShellMarkdown: string;
    sourceImplementationPrecheckJson: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface DisabledShellMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-adapter-disabled-shell"
    | "managed-audit-adapter-implementation-precheck-packet"
    | "runtime-config";
  message: string;
}

const PROFILE_VERSION = "managed-audit-adapter-disabled-shell.v1";
const METHOD_NAMES = ["append", "query", "digest", "health", "describe"] as const;
const ACCEPTED_CANDIDATE_KINDS = ["disabled", "local-dry-run"] as const;

const ENDPOINTS = Object.freeze({
  managedAuditAdapterDisabledShellJson: "/api/v1/audit/managed-audit-adapter-disabled-shell",
  managedAuditAdapterDisabledShellMarkdown: "/api/v1/audit/managed-audit-adapter-disabled-shell?format=markdown",
  sourceImplementationPrecheckJson: "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet",
  activePlan: "docs/plans/v219-post-implementation-precheck-roadmap.md",
});

export class DisabledManagedAuditAdapter implements ManagedAuditAdapter {
  async append(_record: ManagedAuditAppendRecord): Promise<ManagedAuditAdapterAppendResult> {
    return {
      status: "disabled",
      accepted: false,
      written: false,
      code: "MANAGED_AUDIT_ADAPTER_DISABLED",
      message: "Managed audit adapter shell is disabled by default; no audit record was written.",
    };
  }

  async query(_filter: ManagedAuditQueryFilter): Promise<ManagedAuditAdapterQueryResult> {
    return {
      status: "disabled",
      records: [],
      recordCount: 0,
      code: "MANAGED_AUDIT_ADAPTER_DISABLED",
    };
  }

  async digest(): Promise<ManagedAuditAdapterDigestResult> {
    return {
      status: "disabled",
      digest: sha256StableJson({
        profileVersion: PROFILE_VERSION,
        adapterKind: "disabled",
        recordCount: 0,
        externalConnectionEnabled: false,
      }),
      recordCount: 0,
    };
  }

  async health(): Promise<ManagedAuditAdapterHealthResult> {
    return {
      status: "disabled",
      writable: false,
      externalConnectionAttempted: false,
      message: "Disabled shell is healthy as a blocker: it refuses writes and external connections.",
    };
  }

  async describe(): Promise<ManagedAuditAdapterDescription> {
    return {
      adapterName: "DisabledManagedAuditAdapter",
      adapterKind: "disabled",
      profileVersion: PROFILE_VERSION,
      appendEnabled: false,
      queryEnabled: false,
      externalConnectionEnabled: false,
      localDryRunEnabled: false,
    };
  }
}

export function selectManagedAuditAdapterShell(input: {
  config: Pick<AppConfig, "auditStoreKind" | "auditStoreUrl" | "upstreamActionsEnabled">;
}): {
  adapter: ManagedAuditAdapter;
  selection: ManagedAuditAdapterDisabledShellProfile["adapterSelection"];
} {
  return {
    adapter: new DisabledManagedAuditAdapter(),
    selection: {
      defaultAdapterKind: "disabled",
      selectedAdapterKind: "disabled",
      acceptedCandidateKinds: ACCEPTED_CANDIDATE_KINDS,
      requestedStoreKind: input.config.auditStoreKind,
      auditStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
      productionExternalUrlAccepted: false,
      localDryRunCandidateDeclared: true,
      localDryRunSelected: false,
      externalManagedAuditAccessed: false,
      localDryRunWritePerformed: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
  };
}

export async function loadManagedAuditAdapterDisabledShell(input: {
  config: AppConfig;
}): Promise<ManagedAuditAdapterDisabledShellProfile> {
  const sourcePrecheck = loadManagedAuditAdapterImplementationPrecheckPacket({ config: input.config });
  const { adapter, selection } = selectManagedAuditAdapterShell({ config: input.config });
  const sampleRecord: ManagedAuditAppendRecord = {
    requestId: "managed-audit-v220-disabled-shell-request",
    eventType: "DISABLED_SHELL_APPEND_PROBE",
    payload: {
      sourceVersion: "Node v220",
      writesExpected: false,
    },
  };
  const [description, health, appendResult, queryResult, digestResult, digestRepeat] = await Promise.all([
    adapter.describe(),
    adapter.health(),
    adapter.append(sampleRecord),
    adapter.query({ requestId: sampleRecord.requestId, limit: 1 }),
    adapter.digest(),
    adapter.digest(),
  ]);
  const disabledAdapterProbe = {
    descriptionAdapterKind: description.adapterKind,
    healthStatus: health.status,
    appendStatus: appendResult.status,
    appendAccepted: appendResult.accepted,
    appendWritten: appendResult.written,
    queryStatus: queryResult.status,
    queryRecordCount: queryResult.recordCount,
    digestStatus: digestResult.status,
    digest: digestResult.digest,
    externalConnectionAttempted: health.externalConnectionAttempted,
  };
  const adapterInterface = {
    name: "ManagedAuditAdapter" as const,
    methodNames: METHOD_NAMES,
    methodCount: METHOD_NAMES.length as 5,
    minimalSurface: true as const,
  };
  const checks = createChecks(sourcePrecheck, adapterInterface, selection, disabledAdapterProbe, digestResult, digestRepeat);
  checks.readyForManagedAuditAdapterDisabledShell = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditAdapterDisabledShell")
    .every(([, value]) => value);
  const shellState = checks.readyForManagedAuditAdapterDisabledShell ? "disabled-shell-ready" : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit adapter disabled shell",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    shellState,
    readyForManagedAuditAdapterDisabledShell: checks.readyForManagedAuditAdapterDisabledShell,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyShell: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    automaticUpstreamStart: false,
    sourcePrecheck: {
      sourceVersion: "Node v219",
      profileVersion: sourcePrecheck.profileVersion,
      precheckState: sourcePrecheck.precheckState,
      precheckDigest: sourcePrecheck.implementationPrecheck.precheckDigest,
      readyForImplementationPrecheck: sourcePrecheck.readyForManagedAuditAdapterImplementationPrecheck,
    },
    adapterInterface,
    adapterSelection: selection,
    disabledAdapterProbe,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      methodCount: adapterInterface.methodCount,
      acceptedCandidateKindCount: selection.acceptedCandidateKinds.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Ask Java v80 and mini-kv v89 to publish read-only guard receipts before Node v221.",
      "Keep the disabled adapter as the default selection while local-dry-run remains only a declared candidate.",
      "Defer any file/sqlite dry-run write to Node v221 and keep it out of production audit.",
    ],
  };
}

export function renderManagedAuditAdapterDisabledShellMarkdown(profile: ManagedAuditAdapterDisabledShellProfile): string {
  return [
    "# Managed audit adapter disabled shell",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Shell state: ${profile.shellState}`,
    `- Ready for disabled shell: ${profile.readyForManagedAuditAdapterDisabledShell}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Precheck",
    "",
    ...renderEntries(profile.sourcePrecheck),
    "",
    "## Adapter Interface",
    "",
    ...renderEntries(profile.adapterInterface),
    "",
    "## Adapter Selection",
    "",
    ...renderEntries(profile.adapterSelection),
    "",
    "## Disabled Adapter Probe",
    "",
    ...renderEntries(profile.disabledAdapterProbe),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No disabled shell blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No disabled shell warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No disabled shell recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createChecks(
  sourcePrecheck: ManagedAuditAdapterImplementationPrecheckPacketProfile,
  adapterInterface: ManagedAuditAdapterDisabledShellProfile["adapterInterface"],
  selection: ManagedAuditAdapterDisabledShellProfile["adapterSelection"],
  probe: ManagedAuditAdapterDisabledShellProfile["disabledAdapterProbe"],
  digestResult: ManagedAuditAdapterDigestResult,
  digestRepeat: ManagedAuditAdapterDigestResult,
): ManagedAuditAdapterDisabledShellProfile["checks"] {
  return {
    sourcePrecheckReady: sourcePrecheck.readyForManagedAuditAdapterImplementationPrecheck,
    interfaceMethodSurfaceMinimal: adapterInterface.methodNames.join(",") === "append,query,digest,health,describe",
    disabledAdapterSelectedByDefault: selection.defaultAdapterKind === "disabled" && selection.selectedAdapterKind === "disabled",
    localDryRunCandidateOnlyDeclared: selection.localDryRunCandidateDeclared && !selection.localDryRunSelected,
    productionExternalUrlRejected: selection.productionExternalUrlAccepted === false,
    disabledAppendDoesNotWrite: probe.appendStatus === "disabled" && !probe.appendAccepted && !probe.appendWritten,
    disabledQueryReturnsNoRecords: probe.queryStatus === "disabled" && probe.queryRecordCount === 0,
    disabledHealthReportsDisabled: probe.healthStatus === "disabled" && !probe.externalConnectionAttempted,
    disabledDescribeReportsDisabled: probe.descriptionAdapterKind === "disabled",
    disabledDigestStable: digestResult.digest === digestRepeat.digest && /^[a-f0-9]{64}$/.test(digestResult.digest),
    noLocalDryRunWritePerformed: selection.localDryRunWritePerformed === false,
    noExternalManagedAuditAccessed: selection.externalManagedAuditAccessed === false,
    upstreamActionsStillDisabled: selection.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    readyForManagedAuditAdapterDisabledShell: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditAdapterDisabledShellProfile["checks"],
): DisabledShellMessage[] {
  const blockers: DisabledShellMessage[] = [];
  addMessage(blockers, checks.sourcePrecheckReady, "SOURCE_PRECHECK_NOT_READY", "managed-audit-adapter-implementation-precheck-packet", "Node v219 implementation precheck must be ready before the disabled shell is accepted.");
  addMessage(blockers, checks.interfaceMethodSurfaceMinimal, "INTERFACE_METHOD_SURFACE_INVALID", "managed-audit-adapter-disabled-shell", "ManagedAuditAdapter must expose only append/query/digest/health/describe in v220.");
  addMessage(blockers, checks.disabledAdapterSelectedByDefault, "DISABLED_ADAPTER_NOT_DEFAULT", "managed-audit-adapter-disabled-shell", "The disabled adapter must remain the default selected implementation.");
  addMessage(blockers, checks.productionExternalUrlRejected, "PRODUCTION_EXTERNAL_URL_ACCEPTED", "runtime-config", "Production external managed audit URLs must not be accepted by the v220 selector.");
  addMessage(blockers, checks.disabledAppendDoesNotWrite, "DISABLED_APPEND_WROTE_RECORD", "managed-audit-adapter-disabled-shell", "Disabled append must refuse the record and report written=false.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false while the shell is disabled.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-adapter-disabled-shell", "v220 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): DisabledShellMessage[] {
  return [
    {
      code: "DISABLED_SHELL_ONLY",
      severity: "warning",
      source: "managed-audit-adapter-disabled-shell",
      message: "v220 creates the adapter shape and disabled implementation only; it does not write local dry-run records.",
    },
    {
      code: "LOCAL_DRY_RUN_DEFERRED_TO_V221",
      severity: "warning",
      source: "managed-audit-adapter-disabled-shell",
      message: "The local-dry-run candidate is declared but not selected until Java v80 and mini-kv v89 guard receipts exist.",
    },
  ];
}

function collectRecommendations(): DisabledShellMessage[] {
  return [
    {
      code: "REQUEST_JAVA_V80_MINIKV_V89_GUARD_RECEIPTS",
      severity: "recommendation",
      source: "managed-audit-adapter-disabled-shell",
      message: "Proceed with the planned parallel Java v80 and mini-kv v89 guard receipts before Node v221.",
    },
    {
      code: "IMPLEMENT_LOCAL_DRY_RUN_CANDIDATE_NEXT",
      severity: "recommendation",
      source: "managed-audit-adapter-disabled-shell",
      message: "Use this disabled shell as the contract base for the next local file/sqlite dry-run adapter candidate.",
    },
  ];
}

function addMessage(
  messages: DisabledShellMessage[],
  condition: boolean,
  code: string,
  source: DisabledShellMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
