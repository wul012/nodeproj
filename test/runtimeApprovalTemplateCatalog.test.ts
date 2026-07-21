import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  createRuntimeExecutionApprovalInputTemplates,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCatalog.js";
import {
  RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS,
} from "../src/services/runtimeApprovalTemplates/definitions.js";
import {
  validateRuntimeApprovalTemplates,
} from "../src/services/runtimeApprovalTemplates/validation.js";

const EXPECTED_TEMPLATES = [
  [
    "nodeApprovedRuntimeWindow",
    "e/398/input/node-approved-runtime-window-v398.json",
    "e/402/input-templates/node-approved-runtime-window-v402.template.json",
    "258c81c2680b82ae43293e06f8265fa9ec54dd3b676bb66c3e3192f3e10dfec8",
  ],
  [
    "correlatedOperatorApprovalRecord",
    "e/398/input/correlated-operator-approval-record-v398.json",
    "e/402/input-templates/correlated-operator-approval-record-v402.template.json",
    "94fe9195220890c21ef4917dcac909a7d861895046eb940bdcc275ed595dae03",
  ],
  [
    "crossProjectRuntimeExecutionPacket",
    "e/398/input/cross-project-runtime-execution-packet-v398.json",
    "e/402/input-templates/cross-project-runtime-execution-packet-v402.template.json",
    "5d244abb08e9ccfc383ee88e4e5de0f5b55a2bded07a0589d928d0f501db0ad7",
  ],
] as const;

describe("runtime approval template catalog", () => {
  it("preserves the exact ordered template definitions and catalog bytes", () => {
    const templates = createRuntimeExecutionApprovalInputTemplates();
    const serialized = JSON.stringify(templates);

    expect(templates.map(({ key, targetPath, templateArchivePath, templateDigest }) => [
      key,
      targetPath,
      templateArchivePath,
      templateDigest,
    ])).toEqual(EXPECTED_TEMPLATES);
    expect(Buffer.byteLength(serialized)).toBe(7_304);
    expect(createHash("sha256").update(serialized).digest("hex")).toBe(
      "ead27560546b4dda1a640ec3141378573f5fd9cb395a6b617f7096cfcd85b08b",
    );
    expect(RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS.map((definition) => definition.key)).toEqual(
      EXPECTED_TEMPLATES.map(([key]) => key),
    );
    expect(Object.isFrozen(RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS)).toBe(true);
    expect(RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS.every(Object.isFrozen)).toBe(true);
  });

  it("returns fresh nested values on every catalog read", () => {
    const first = createRuntimeExecutionApprovalInputTemplates();
    const second = createRuntimeExecutionApprovalInputTemplates();

    first[0].requiredFields.push("mutation-probe");
    first[2].template.serviceOwners = { node: "mutation-probe" };

    expect(second[0].requiredFields).not.toContain("mutation-probe");
    expect(second[2].template.serviceOwners).toEqual({
      java: "java-platform-operator",
      miniKv: "mini-kv-service-owner",
      node: "node-control-plane-operator",
    });
    expect(createRuntimeExecutionApprovalInputTemplates()).toEqual(second);
  });

  it("rejects catalog layout, path, field, constant, and semantic drift", () => {
    const definitions = structuredClone(RUNTIME_APPROVAL_TEMPLATE_DEFINITIONS);
    const swapped = [definitions[1], definitions[0], definitions[2]];
    const wrongPath = structuredClone(definitions);
    wrongPath[0].targetPath = "e/398/input/wrong.json";
    const missingField = structuredClone(definitions);
    missingField[0].requiredFields = [];
    const wrongConstant = structuredClone(definitions);
    wrongConstant[1].expectedConstants.operatorVerified = false;
    const emptyRules = structuredClone(definitions);
    emptyRules[2].semanticRules = [];
    const wrongIdentity = structuredClone(definitions);
    wrongIdentity[2].template.schemaVersion = "wrong.v1";

    expect(() => validateRuntimeApprovalTemplates([])).toThrow("exactly 3");
    expect(() => validateRuntimeApprovalTemplates(swapped)).toThrow("layout mismatch");
    expect(() => validateRuntimeApprovalTemplates(wrongPath)).toThrow("layout mismatch");
    expect(() => validateRuntimeApprovalTemplates(missingField)).toThrow("required fields");
    expect(() => validateRuntimeApprovalTemplates(wrongConstant)).toThrow("expected constants");
    expect(() => validateRuntimeApprovalTemplates(emptyRules)).toThrow("semantic rules");
    expect(() => validateRuntimeApprovalTemplates(wrongIdentity)).toThrow("template identity");
  });
});
