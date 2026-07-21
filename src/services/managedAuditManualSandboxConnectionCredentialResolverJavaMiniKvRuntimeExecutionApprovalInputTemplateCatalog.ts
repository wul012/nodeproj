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
import {
  RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS,
  type RuntimeApprovalTemplateInput,
} from "./runtimeApprovalTemplates/definitions.js";
import {
  approvalValueAtPath as valueAtPath,
  hasApprovalValue as hasValue,
  validateRuntimeApprovalTemplates,
} from "./runtimeApprovalTemplates/validation.js";

export {
  CROSS_PROJECT_PACKET_TARGET,
  NODE_RUNTIME_WINDOW_TARGET,
  OPERATOR_APPROVAL_TARGET,
  TEMPLATE_ROOT,
} from "./runtimeApprovalTemplates/constants.js";

export function createRuntimeExecutionApprovalInputTemplates(): RuntimeExecutionApprovalInputTemplateDefinition[] {
  validateRuntimeApprovalTemplates(RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS);
  return RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS.map(createTemplate);
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
  input: Readonly<RuntimeApprovalTemplateInput>,
): RuntimeExecutionApprovalInputTemplateDefinition {
  const templateInput = structuredClone(input);
  return {
    ...templateInput,
    templateDigest: sha256StableJson(templateInput.template),
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
