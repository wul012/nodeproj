import {
  CROSS_PROJECT_PACKET_TARGET,
  NODE_RUNTIME_WINDOW_TARGET,
  OPERATOR_APPROVAL_TARGET,
  TEMPLATE_ROOT,
} from "./constants.js";
import type { RuntimeApprovalTemplateInput } from "./definitions.js";

const EXPECTED_TEMPLATE_LAYOUT = Object.freeze([
  {
    key: "nodeApprovedRuntimeWindow",
    owner: "node",
    targetPath: NODE_RUNTIME_WINDOW_TARGET,
  },
  {
    key: "correlatedOperatorApprovalRecord",
    owner: "operator",
    targetPath: OPERATOR_APPROVAL_TARGET,
  },
  {
    key: "crossProjectRuntimeExecutionPacket",
    owner: "cross-project",
    targetPath: CROSS_PROJECT_PACKET_TARGET,
  },
] as const);

export function validateRuntimeApprovalTemplates(
  definitions: readonly Readonly<RuntimeApprovalTemplateInput>[],
): void {
  if (definitions.length !== EXPECTED_TEMPLATE_LAYOUT.length) {
    throw new Error("Runtime approval catalog must contain exactly 3 template definitions");
  }

  definitions.forEach((definition, index) => {
    const expected = EXPECTED_TEMPLATE_LAYOUT[index];
    if (
      definition.key !== expected.key
      || definition.owner !== expected.owner
      || definition.targetPath !== expected.targetPath
    ) {
      throw new Error(`Runtime approval template layout mismatch at index ${index}`);
    }
    if (
      definition.templateArchivePath === definition.targetPath
      || !definition.templateArchivePath.startsWith(`${TEMPLATE_ROOT}/`)
    ) {
      throw new Error(`Runtime approval template archive path is invalid: ${definition.key}`);
    }

    validateTemplateFields(definition);
  });
}

export function hasApprovalValue(input: Record<string, unknown>, path: string): boolean {
  const value = approvalValueAtPath(input, path);
  if (value === undefined || value === null) {
    return false;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
}

export function approvalValueAtPath(input: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }
    return (current as Record<string, unknown>)[segment];
  }, input);
}

function validateTemplateFields(definition: Readonly<RuntimeApprovalTemplateInput>): void {
  const requiredFields = new Set(definition.requiredFields);
  const semanticRules = new Set(definition.semanticRules);
  if (
    requiredFields.size === 0
    || requiredFields.size !== definition.requiredFields.length
    || !definition.requiredFields.every((field) => hasApprovalValue(definition.template, field))
  ) {
    throw new Error(`Runtime approval required fields are invalid: ${definition.key}`);
  }
  if (
    approvalValueAtPath(definition.template, "schemaVersion") !== definition.schemaVersion
    || approvalValueAtPath(definition.template, "inputKind") !== definition.inputKind
  ) {
    throw new Error(`Runtime approval template identity is invalid: ${definition.key}`);
  }
  if (
    Object.keys(definition.expectedConstants).length === 0
    || !Object.entries(definition.expectedConstants)
      .every(([field, expected]) => approvalValueAtPath(definition.template, field) === expected)
  ) {
    throw new Error(`Runtime approval expected constants are invalid: ${definition.key}`);
  }
  if (
    semanticRules.size === 0
    || semanticRules.size !== definition.semanticRules.length
    || definition.semanticRules.some((rule) => rule.trim().length === 0)
  ) {
    throw new Error(`Runtime approval semantic rules are invalid: ${definition.key}`);
  }
}
