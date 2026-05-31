import {
  booleanField,
  evidenceFile,
  numberField,
  readJsonObject,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  RuntimeExecutionApprovalInputTargetValidation,
  RuntimeExecutionApprovalInputTemplateDefinition,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorTypes.js";

export const NODE_RUNTIME_WINDOW_TARGET = "e/398/input/node-approved-runtime-window-v398.json";
export const OPERATOR_APPROVAL_TARGET = "e/398/input/correlated-operator-approval-record-v398.json";
export const CROSS_PROJECT_PACKET_TARGET = "e/398/input/cross-project-runtime-execution-packet-v398.json";
export const TEMPLATE_ROOT = "e/402/input-templates";

export function createRuntimeExecutionApprovalInputTemplates(): RuntimeExecutionApprovalInputTemplateDefinition[] {
  return [
    createTemplate({
      key: "nodeApprovedRuntimeWindow",
      owner: "node",
      targetPath: NODE_RUNTIME_WINDOW_TARGET,
      templateArchivePath: `${TEMPLATE_ROOT}/node-approved-runtime-window-v402.template.json`,
      schemaVersion: "node-runtime-execution-approval-input.v1",
      inputKind: "node-approved-runtime-window",
      requiredFields: [
        "schemaVersion",
        "inputKind",
        "activeNodeVersion",
        "sourceNodeVersion",
        "javaSourceVersion",
        "miniKvSourceVersion",
        "approvalWindowId",
        "approvalCorrelationId",
        "windowMode",
        "notBeforeIso",
        "notAfterIso",
        "javaLoopbackHost",
        "javaLoopbackPort",
        "miniKvLoopbackHost",
        "miniKvLoopbackPort",
        "allowedHttpMethods",
        "cleanupRequired",
      ],
      expectedConstants: {
        schemaVersion: "node-runtime-execution-approval-input.v1",
        inputKind: "node-approved-runtime-window",
        activeNodeVersion: "Node v402",
        sourceNodeVersion: "Node v401",
        javaSourceVersion: "Java v165",
        miniKvSourceVersion: "mini-kv v156",
        upstreamActionsEnabled: false,
        cleanupRequired: true,
      },
      semanticRules: [
        "allowedHttpMethods must contain only GET",
        "notBeforeIso and notAfterIso must be explicit ISO strings supplied by the approver",
        "loopback ports must bind Java and mini-kv in the same runtime window",
      ],
      template: {
        schemaVersion: "node-runtime-execution-approval-input.v1",
        inputKind: "node-approved-runtime-window",
        activeNodeVersion: "Node v402",
        sourceNodeVersion: "Node v401",
        javaSourceVersion: "Java v165",
        miniKvSourceVersion: "mini-kv v156",
        approvalWindowId: "REQUIRED-runtime-window-id",
        approvalCorrelationId: "REQUIRED-shared-approval-correlation-id",
        windowMode: "manual-approved-runtime-read-only-smoke",
        notBeforeIso: "REQUIRED-iso8601",
        notAfterIso: "REQUIRED-iso8601",
        javaLoopbackHost: "127.0.0.1",
        javaLoopbackPort: 8080,
        miniKvLoopbackHost: "127.0.0.1",
        miniKvLoopbackPort: 6424,
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
        allowedHttpMethods: ["GET"],
        runtimeExecutionPacketRequired: true,
        cleanupRequired: true,
      },
    }),
    createTemplate({
      key: "correlatedOperatorApprovalRecord",
      owner: "operator",
      targetPath: OPERATOR_APPROVAL_TARGET,
      templateArchivePath: `${TEMPLATE_ROOT}/correlated-operator-approval-record-v402.template.json`,
      schemaVersion: "correlated-operator-approval-record.v1",
      inputKind: "correlated-operator-approval-record",
      requiredFields: [
        "schemaVersion",
        "inputKind",
        "approvalCorrelationId",
        "approvedRuntimeWindowId",
        "operatorId",
        "operatorVerified",
        "bindsNodeVersion",
        "bindsSourceNodeVersion",
        "bindsJavaVersion",
        "bindsMiniKvVersion",
        "approvalScope",
        "allowedHttpMethods",
        "issuedAtIso",
        "cleanupAcknowledged",
      ],
      expectedConstants: {
        schemaVersion: "correlated-operator-approval-record.v1",
        inputKind: "correlated-operator-approval-record",
        operatorVerified: true,
        bindsNodeVersion: "Node v402",
        bindsSourceNodeVersion: "Node v401",
        bindsJavaVersion: "Java v165",
        bindsMiniKvVersion: "mini-kv v156",
        approvesCredentialValueRead: false,
        approvesRawEndpointUrlParsing: false,
        cleanupAcknowledged: true,
      },
      semanticRules: [
        "approvalCorrelationId must match the Node runtime window and packet",
        "operatorVerified must be true",
        "allowedHttpMethods must contain only GET",
      ],
      template: {
        schemaVersion: "correlated-operator-approval-record.v1",
        inputKind: "correlated-operator-approval-record",
        approvalCorrelationId: "REQUIRED-shared-approval-correlation-id",
        approvedRuntimeWindowId: "REQUIRED-runtime-window-id",
        operatorId: "REQUIRED-operator-id",
        operatorVerified: true,
        bindsNodeVersion: "Node v402",
        bindsSourceNodeVersion: "Node v401",
        bindsJavaVersion: "Java v165",
        bindsMiniKvVersion: "mini-kv v156",
        approvalScope: "java-mini-kv-runtime-read-only-smoke",
        allowedHttpMethods: ["GET"],
        approvesCredentialValueRead: false,
        approvesRawEndpointUrlParsing: false,
        issuedAtIso: "REQUIRED-iso8601",
        cleanupAcknowledged: true,
      },
    }),
    createTemplate({
      key: "crossProjectRuntimeExecutionPacket",
      owner: "cross-project",
      targetPath: CROSS_PROJECT_PACKET_TARGET,
      templateArchivePath: `${TEMPLATE_ROOT}/cross-project-runtime-execution-packet-v402.template.json`,
      schemaVersion: "cross-project-runtime-execution-packet.v1",
      inputKind: "complete-cross-project-runtime-execution-packet",
      requiredFields: [
        "schemaVersion",
        "inputKind",
        "packetId",
        "approvalCorrelationId",
        "nodeApprovedRuntimeWindowInput",
        "correlatedOperatorApprovalRecordInput",
        "sourceNodeV401Archive",
        "javaApprovalInputEvidence",
        "miniKvFinalApprovalInputEvidence",
        "nodeVersion",
        "javaVersion",
        "miniKvVersion",
        "runtimeExecutionPacketPresent",
        "runtimeExecutionPacketExecutable",
        "readyForRuntimeLiveReadGate",
        "allowedHttpMethods",
        "writeOperationsAllowed",
        "cleanupProofRequiredAfterRun",
      ],
      expectedConstants: {
        schemaVersion: "cross-project-runtime-execution-packet.v1",
        inputKind: "complete-cross-project-runtime-execution-packet",
        nodeApprovedRuntimeWindowInput: NODE_RUNTIME_WINDOW_TARGET,
        correlatedOperatorApprovalRecordInput: OPERATOR_APPROVAL_TARGET,
        nodeVersion: "Node v402",
        javaVersion: "Java v165",
        miniKvVersion: "mini-kv v156",
        runtimeExecutionPacketPresent: true,
        runtimeExecutionPacketExecutable: true,
        readyForRuntimeLiveReadGate: true,
        writeOperationsAllowed: false,
        cleanupProofRequiredAfterRun: true,
      },
      semanticRules: [
        "approvalCorrelationId must match the Node window and operator record",
        "allowedHttpMethods must contain only GET",
        "packet must include service owners, loopback ports, smoke commands, and cleanup rules",
      ],
      template: {
        schemaVersion: "cross-project-runtime-execution-packet.v1",
        inputKind: "complete-cross-project-runtime-execution-packet",
        packetId: "REQUIRED-runtime-execution-packet-id",
        approvalCorrelationId: "REQUIRED-shared-approval-correlation-id",
        nodeApprovedRuntimeWindowInput: NODE_RUNTIME_WINDOW_TARGET,
        correlatedOperatorApprovalRecordInput: OPERATOR_APPROVAL_TARGET,
        sourceNodeV401Archive:
          "e/401/evidence/java-mini-kv-runtime-execution-approval-input-completion-intake-v401-http.json",
        javaApprovalInputEvidence:
          "D:/javaproj/advanced-order-platform/e/165/evidence/java-shard-readiness-runtime-execution-approval-input-contract-handoff-v165.json",
        miniKvFinalApprovalInputEvidence: "D:/C/mini-kv/fixtures/release/shard-readiness-v156.json",
        nodeVersion: "Node v402",
        javaVersion: "Java v165",
        miniKvVersion: "mini-kv v156",
        runtimeExecutionPacketPresent: true,
        runtimeExecutionPacketExecutable: true,
        readyForRuntimeLiveReadGate: true,
        allowedHttpMethods: ["GET"],
        writeOperationsAllowed: false,
        managedAuditConnectionAllowed: false,
        rawEndpointUrlParsingAllowed: false,
        cleanupProofRequiredAfterRun: true,
        serviceOwners: {
          java: "java-platform-operator",
          miniKv: "mini-kv-service-owner",
          node: "node-control-plane-operator",
        },
        loopback: {
          java: { host: "127.0.0.1", port: 8080 },
          miniKv: { host: "127.0.0.1", port: 6424 },
        },
        smokeCommands: [
          { owner: "java", method: "GET", path: "/actuator/health" },
          { owner: "mini-kv", method: "GET", path: "/health" },
        ],
        cleanupRules: [
          "stop-only-owned-java-processes",
          "stop-only-owned-mini-kv-processes",
          "archive-cleanup-proof-after-runtime-start",
        ],
      },
    }),
  ];
}

export function createRuntimeExecutionApprovalInputTargetValidation(
  template: RuntimeExecutionApprovalInputTemplateDefinition,
  options: { readCurrentTarget?: boolean } = {},
): RuntimeExecutionApprovalInputTargetValidation {
  const readCurrentTarget = options.readCurrentTarget === true;
  const json = readCurrentTarget ? readJsonObject(template.targetPath) : {};
  const file = readCurrentTarget
    ? evidenceFile(template.key, template.targetPath)
    : {
      id: template.key,
      path: template.targetPath,
      resolvedPath: template.targetPath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  const missingRequiredFieldCount = template.requiredFields.filter((field) => !hasValue(json, field)).length;
  const passedExpectedConstantCount = Object.entries(template.expectedConstants)
    .filter(([field, expected]) => valueAtPath(json, field) === expected).length;
  const passedSemanticRuleCount = countPassedSemanticRules(template.key, json);
  const valid = file.exists
    && missingRequiredFieldCount === 0
    && passedExpectedConstantCount === Object.keys(template.expectedConstants).length
    && passedSemanticRuleCount === template.semanticRules.length;

  return {
    key: template.key,
    owner: template.owner,
    file,
    present: file.exists,
    valid,
    requiredFieldCount: template.requiredFields.length,
    missingRequiredFieldCount,
    expectedConstantCount: Object.keys(template.expectedConstants).length,
    passedExpectedConstantCount,
    semanticRuleCount: template.semanticRules.length,
    passedSemanticRuleCount,
    canUnlockRuntimeAlone: false,
  };
}

export function templateDefinitionComplete(
  templates: RuntimeExecutionApprovalInputTemplateDefinition[],
  key: RuntimeExecutionApprovalInputTemplateDefinition["key"],
): boolean {
  const template = templates.find((candidate) => candidate.key === key);
  return template !== undefined
    && template.requiredFields.length > 0
    && Object.keys(template.expectedConstants).length > 0
    && template.semanticRules.length > 0
    && isDigest(template.templateDigest);
}

function createTemplate(
  input: Omit<RuntimeExecutionApprovalInputTemplateDefinition, "templateDigest">,
): RuntimeExecutionApprovalInputTemplateDefinition {
  return {
    ...input,
    templateDigest: sha256StableJson(input.template),
  };
}

function countPassedSemanticRules(
  key: RuntimeExecutionApprovalInputTemplateDefinition["key"],
  json: Record<string, unknown>,
): number {
  if (Object.keys(json).length === 0) {
    return 0;
  }
  const allowedHttpMethods = stringArrayField(json, "allowedHttpMethods");
  const getOnly = allowedHttpMethods.length > 0 && allowedHttpMethods.every((method) => method === "GET");

  if (key === "nodeApprovedRuntimeWindow") {
    return [
      getOnly,
      isConcreteIsoField(json, "notBeforeIso") && isConcreteIsoField(json, "notAfterIso"),
      stringField(json, "javaLoopbackHost") === "127.0.0.1"
        && numberField(json, "javaLoopbackPort") !== null
        && stringField(json, "miniKvLoopbackHost") === "127.0.0.1"
        && numberField(json, "miniKvLoopbackPort") !== null,
    ].filter(Boolean).length;
  }

  if (key === "correlatedOperatorApprovalRecord") {
    return [
      isConcreteStringField(json, "approvalCorrelationId"),
      booleanField(json, "operatorVerified") === true,
      getOnly,
    ].filter(Boolean).length;
  }

  return [
    isConcreteStringField(json, "approvalCorrelationId"),
    getOnly,
    hasValue(json, "serviceOwners")
      && hasValue(json, "loopback")
      && hasValue(json, "smokeCommands")
      && hasValue(json, "cleanupRules"),
  ].filter(Boolean).length;
}

function hasValue(input: Record<string, unknown>, path: string): boolean {
  const value = valueAtPath(input, path);
  if (value === undefined || value === null) {
    return false;
  }
  if (typeof value === "string") {
    return value.length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
}

function valueAtPath(input: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }
    return (current as Record<string, unknown>)[segment];
  }, input);
}

function isConcreteStringField(input: Record<string, unknown>, key: string): boolean {
  const value = stringField(input, key);
  return value !== null && value.length > 0 && !value.startsWith("REQUIRED-");
}

function isConcreteIsoField(input: Record<string, unknown>, key: string): boolean {
  const value = stringField(input, key);
  return value !== null && /^\d{4}-\d{2}-\d{2}T/.test(value);
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
