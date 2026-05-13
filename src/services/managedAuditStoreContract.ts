import { createHash, randomUUID } from "node:crypto";

import type { AppConfig } from "../config.js";

export interface ManagedAuditStoreContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-store-contract.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  runtime: {
    requestedStoreKind: string;
    auditStoreUrlConfigured: boolean;
    realManagedAdapterConnected: false;
    fakeAdapterUsed: true;
    migratesFileAudit: false;
    deletesOrRotatesAuditFiles: false;
  };
  requiredCapabilities: ManagedAuditCapability[];
  fakeAdapterEvidence: {
    adapterName: "InMemoryManagedAuditStoreFake";
    appendedEventId: string;
    requestId: string;
    queryByRequestIdCount: number;
    appendOnlyCountAfterWrite: number;
    digestBefore: string;
    digestAfterWrite: string;
    digestStableOnRepeatRead: boolean;
    retentionMetadata: {
      retentionDays: number;
      rotationEnabled: boolean;
      backupEnabled: boolean;
    };
    backupRestoreMarker: string;
  };
  checks: {
    appendOnlyWriteCovered: boolean;
    queryByRequestIdCovered: boolean;
    digestVerificationCovered: boolean;
    retentionMetadataCovered: boolean;
    backupRestoreMarkerCovered: boolean;
    fakeAdapterDoesNotClaimProduction: boolean;
    realManagedAdapterConnected: boolean;
  };
  summary: {
    capabilityCount: number;
    coveredCapabilityCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManagedAuditStoreContractMessage[];
  warnings: ManagedAuditStoreContractMessage[];
  recommendations: ManagedAuditStoreContractMessage[];
  evidenceEndpoints: {
    managedAuditStoreContractJson: string;
    managedAuditStoreContractMarkdown: string;
    auditRetentionIntegrityJson: string;
    auditStoreRuntimeProfileJson: string;
  };
  nextActions: string[];
}

export interface ManagedAuditCapability {
  id: "append-only-write" | "query-by-request-id" | "digest-verification" | "retention-metadata" | "backup-restore-marker";
  requiredForProduction: true;
  coveredByFakeAdapter: boolean;
  productionAdapterRequired: true;
  note: string;
}

export interface ManagedAuditStoreContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

interface ManagedAuditEvent {
  id: string;
  requestId: string;
  action: string;
  operatorId: string;
  occurredAt: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditStoreContractJson: "/api/v1/audit/managed-store-contract",
  managedAuditStoreContractMarkdown: "/api/v1/audit/managed-store-contract?format=markdown",
  auditRetentionIntegrityJson: "/api/v1/audit/retention-integrity-evidence",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
});

export function createManagedAuditStoreContractProfile(
  config: Pick<AppConfig, "auditStoreKind" | "auditStoreUrl" | "auditRetentionDays" | "auditRotationEnabled" | "auditBackupEnabled">,
): ManagedAuditStoreContractProfile {
  const fake = new InMemoryManagedAuditStoreFake({
    retentionDays: config.auditRetentionDays,
    rotationEnabled: config.auditRotationEnabled,
    backupEnabled: config.auditBackupEnabled,
  });
  const digestBefore = fake.digest();
  const event = createContractEvent();
  fake.append(event);
  const digestAfterWrite = fake.digest();
  const digestAfterRepeatRead = fake.digest();
  const queried = fake.queryByRequestId(event.requestId);
  const retentionMetadata = fake.retentionMetadata();
  const backupRestoreMarker = fake.backupRestoreMarker();
  const requiredCapabilities = createCapabilities();
  const checks = {
    appendOnlyWriteCovered: fake.size() === 1 && digestBefore !== digestAfterWrite,
    queryByRequestIdCovered: queried.length === 1 && queried[0]?.id === event.id,
    digestVerificationCovered: digestAfterWrite === digestAfterRepeatRead && digestAfterWrite.startsWith("sha256:"),
    retentionMetadataCovered: retentionMetadata.retentionDays > 0
      && retentionMetadata.rotationEnabled
      && retentionMetadata.backupEnabled,
    backupRestoreMarkerCovered: backupRestoreMarker.startsWith("backup-restore-marker:"),
    fakeAdapterDoesNotClaimProduction: true,
    realManagedAdapterConnected: false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit store contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-store-contract.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    runtime: {
      requestedStoreKind: config.auditStoreKind,
      auditStoreUrlConfigured: config.auditStoreUrl.length > 0,
      realManagedAdapterConnected: false,
      fakeAdapterUsed: true,
      migratesFileAudit: false,
      deletesOrRotatesAuditFiles: false,
    },
    requiredCapabilities,
    fakeAdapterEvidence: {
      adapterName: "InMemoryManagedAuditStoreFake",
      appendedEventId: event.id,
      requestId: event.requestId,
      queryByRequestIdCount: queried.length,
      appendOnlyCountAfterWrite: fake.size(),
      digestBefore,
      digestAfterWrite,
      digestStableOnRepeatRead: digestAfterWrite === digestAfterRepeatRead,
      retentionMetadata,
      backupRestoreMarker,
    },
    checks,
    summary: {
      capabilityCount: requiredCapabilities.length,
      coveredCapabilityCount: [
        checks.appendOnlyWriteCovered,
        checks.queryByRequestIdCovered,
        checks.digestVerificationCovered,
        checks.retentionMetadataCovered,
        checks.backupRestoreMarkerCovered,
      ].filter(Boolean).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Implement a real managed adapter in a dedicated version before production operations.",
      "Keep file audit evidence as rehearsal input and do not migrate or delete it in this contract version.",
      "Use this contract as input for the deployment environment readiness gate.",
    ],
  };
}

export function renderManagedAuditStoreContractMarkdown(profile: ManagedAuditStoreContractProfile): string {
  return [
    "# Managed audit store contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runtime",
    "",
    ...renderEntries(profile.runtime),
    "",
    "## Required Capabilities",
    "",
    ...profile.requiredCapabilities.flatMap(renderCapability),
    "## Fake Adapter Evidence",
    "",
    ...renderEntries(profile.fakeAdapterEvidence),
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
    ...renderMessages(profile.productionBlockers, "No managed audit blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit recommendations."),
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

class InMemoryManagedAuditStoreFake {
  private readonly events: ManagedAuditEvent[] = [];

  constructor(private readonly metadata: {
    retentionDays: number;
    rotationEnabled: boolean;
    backupEnabled: boolean;
  }) {}

  append(event: ManagedAuditEvent): void {
    this.events.push(event);
  }

  queryByRequestId(requestId: string): ManagedAuditEvent[] {
    return this.events.filter((event) => event.requestId === requestId);
  }

  digest(): string {
    return `sha256:${createHash("sha256").update(JSON.stringify(this.events)).digest("hex")}`;
  }

  retentionMetadata(): ManagedAuditStoreContractProfile["fakeAdapterEvidence"]["retentionMetadata"] {
    return { ...this.metadata };
  }

  backupRestoreMarker(): string {
    return `backup-restore-marker:${this.digest().slice("sha256:".length, "sha256:".length + 16)}`;
  }

  size(): number {
    return this.events.length;
  }
}

function createContractEvent(): ManagedAuditEvent {
  return {
    id: randomUUID(),
    requestId: "managed-audit-contract-request",
    action: "CONTRACT_APPEND_ONLY_WRITE",
    operatorId: "managed-audit-contract",
    occurredAt: new Date().toISOString(),
  };
}

function createCapabilities(): ManagedAuditCapability[] {
  return [
    {
      id: "append-only-write",
      requiredForProduction: true,
      coveredByFakeAdapter: true,
      productionAdapterRequired: true,
      note: "Production audit must append records without rewriting existing events.",
    },
    {
      id: "query-by-request-id",
      requiredForProduction: true,
      coveredByFakeAdapter: true,
      productionAdapterRequired: true,
      note: "Operators must retrieve evidence by requestId during incident review.",
    },
    {
      id: "digest-verification",
      requiredForProduction: true,
      coveredByFakeAdapter: true,
      productionAdapterRequired: true,
      note: "Evidence must expose stable digests for release and audit reports.",
    },
    {
      id: "retention-metadata",
      requiredForProduction: true,
      coveredByFakeAdapter: true,
      productionAdapterRequired: true,
      note: "Managed audit must report retention and rotation metadata.",
    },
    {
      id: "backup-restore-marker",
      requiredForProduction: true,
      coveredByFakeAdapter: true,
      productionAdapterRequired: true,
      note: "Managed audit must expose a backup/restore marker for readiness gates.",
    },
  ];
}

function collectProductionBlockers(
  checks: ManagedAuditStoreContractProfile["checks"],
): ManagedAuditStoreContractMessage[] {
  const blockers: ManagedAuditStoreContractMessage[] = [];
  addMessage(blockers, checks.appendOnlyWriteCovered, "APPEND_ONLY_CONTRACT_UNCOVERED", "Managed audit append-only write contract must be covered.");
  addMessage(blockers, checks.queryByRequestIdCovered, "REQUEST_QUERY_CONTRACT_UNCOVERED", "Managed audit query-by-requestId contract must be covered.");
  addMessage(blockers, checks.digestVerificationCovered, "DIGEST_CONTRACT_UNCOVERED", "Managed audit digest verification contract must be covered.");
  addMessage(blockers, checks.retentionMetadataCovered, "RETENTION_METADATA_CONTRACT_UNCOVERED", "Retention metadata contract must be covered by configured rehearsal metadata.");
  addMessage(blockers, checks.backupRestoreMarkerCovered, "BACKUP_RESTORE_MARKER_UNCOVERED", "Backup/restore marker contract must be covered.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "A fake adapter covers the contract, but no production managed audit adapter is connected.");
  return blockers;
}

function collectWarnings(config: Pick<AppConfig, "auditStoreKind" | "auditStoreUrl">): ManagedAuditStoreContractMessage[] {
  return [
    {
      code: "FAKE_ADAPTER_ONLY",
      severity: "warning",
      message: "InMemoryManagedAuditStoreFake proves the adapter contract only; it is not production storage.",
    },
    {
      code: config.auditStoreUrl.length > 0 ? "AUDIT_STORE_URL_UNUSED" : "AUDIT_STORE_URL_MISSING",
      severity: "warning",
      message: config.auditStoreUrl.length > 0
        ? "AUDIT_STORE_URL is configured but not used by a real managed adapter in this version."
        : "No managed audit store URL is configured for a future production adapter.",
    },
  ];
}

function collectRecommendations(): ManagedAuditStoreContractMessage[] {
  return [
    {
      code: "IMPLEMENT_DATABASE_ADAPTER",
      severity: "recommendation",
      message: "Implement a real database or managed audit service adapter after this contract is stable.",
    },
    {
      code: "ADD_BACKUP_RESTORE_TESTS",
      severity: "recommendation",
      message: "Add restore drills and retention tests before treating audit storage as production-ready.",
    },
  ];
}

function addMessage(
  messages: ManagedAuditStoreContractMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderCapability(capability: ManagedAuditCapability): string[] {
  return [
    `### ${capability.id}`,
    "",
    `- Required for production: ${capability.requiredForProduction}`,
    `- Covered by fake adapter: ${capability.coveredByFakeAdapter}`,
    `- Production adapter required: ${capability.productionAdapterRequired}`,
    `- Note: ${capability.note}`,
    "",
  ];
}

function renderMessages(messages: ManagedAuditStoreContractMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
}

function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
