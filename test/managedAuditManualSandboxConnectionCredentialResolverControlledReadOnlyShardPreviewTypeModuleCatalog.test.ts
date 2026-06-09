import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewTypeModuleCatalog,
  listControlledReadOnlyShardPreviewTypeModules,
  validateControlledReadOnlyShardPreviewTypeModuleCatalog,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";
import {
  renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.js";

describe("controlled read-only shard preview type module catalog", () => {
  it("records stable type module ownership groups", () => {
    const catalog = createControlledReadOnlyShardPreviewTypeModuleCatalog();

    expect(catalog.catalogVersion).toBe("Node v1556");
    expect(catalog.publicEntryPoint)
      .toBe("managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts");
    expect(catalog.moduleCount).toBe(217);
    expect(catalog.stableReExportModuleCount).toBe(catalog.moduleCount);
    expect(catalog.stopCondition).toContain("add a new type module only when");
  });

  it("keeps module ids, paths, and order unique", () => {
    const entries = listControlledReadOnlyShardPreviewTypeModules();

    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.modulePath)).size).toBe(entries.length);
    expect(entries.map((entry) => entry.order)).toEqual(entries.map((_, index) => index + 1));
    expect(entries.at(-1)).toMatchObject({
      id: "profile-entry-types",
      modulePath: "managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts",
    });
  });

  it("requires every module to declare ownership and a stop condition", () => {
    const entries = listControlledReadOnlyShardPreviewTypeModules();

    for (const entry of entries) {
      expect(entry.owns.length).toBeGreaterThan(0);
      expect(entry.consumedBy.length).toBeGreaterThan(0);
      expect(entry.exportsViaStableProfileTypes).toBe(true);
      expect(entry.maintenanceRule.length).toBeGreaterThan(0);
      expect(entry.stopCondition).toMatch(/^Do not split|^Use these ownership groups/);
    }
  });

  it("renders a stable markdown catalog for archive review", () => {
    const markdown = renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown();

    expect(markdown).toContain("# Controlled read-only shard preview type module catalog");
    expect(markdown).toContain("- Catalog version: Node v1556");
    expect(markdown).toContain("- Module count: 217");
    expect(markdown).toContain("### 1. source-matrix-types");
    expect(markdown).toContain("### 13. execution-readiness-types");
    expect(markdown).toContain("### 16. live-read-only-window-stage-ledger-types");
    expect(markdown).toContain("### 19. live-read-only-window-runbook-types");
    expect(markdown).toContain("### 22. live-read-only-window-rehearsal-types");
    expect(markdown).toContain("### 25. live-read-only-window-command-worksheet-types");
    expect(markdown).toContain("### 28. live-read-only-window-evidence-packet-types");
    expect(markdown).toContain("### 31. live-read-only-window-evidence-intake-ledger-types");
    expect(markdown).toContain("### 32. live-read-only-window-evidence-intake-ledger-artifacts");
    expect(markdown).toContain("### 33. live-read-only-window-evidence-intake-ledger-renderer");
    expect(markdown).toContain("### 34. live-read-only-window-evidence-intake-review-package-types");
    expect(markdown).toContain("### 35. live-read-only-window-evidence-intake-review-package-artifacts");
    expect(markdown).toContain("### 36. live-read-only-window-evidence-intake-review-package-renderer");
    expect(markdown).toContain("### 37. live-read-only-window-profile-sections-renderer");
    expect(markdown).toContain("### 38. live-read-only-window-manual-evidence-entry-worksheet-types");
    expect(markdown).toContain("### 39. live-read-only-window-manual-evidence-entry-worksheet-artifacts");
    expect(markdown).toContain("### 40. live-read-only-window-manual-evidence-entry-worksheet-renderer");
    expect(markdown).toContain("### 41. type-module-catalog-entry-builder");
    expect(markdown).toContain("### 42. live-read-only-window-operator-evidence-import-preflight-types");
    expect(markdown).toContain("### 43. live-read-only-window-operator-evidence-import-preflight-slot-builder");
    expect(markdown).toContain("### 44. live-read-only-window-operator-evidence-import-preflight-artifacts");
    expect(markdown).toContain("### 45. live-read-only-window-operator-evidence-import-preflight-renderer");
    expect(markdown).toContain("### 46. live-read-only-window-operator-evidence-value-draft-types");
    expect(markdown).toContain("### 47. live-read-only-window-operator-evidence-value-draft-slot-builder");
    expect(markdown).toContain("### 48. live-read-only-window-operator-evidence-value-draft-artifacts");
    expect(markdown).toContain("### 49. live-read-only-window-operator-evidence-value-draft-renderer");
    expect(markdown).toContain("### 50. live-read-only-window-operator-evidence-fresh-sibling-intake-types");
    expect(markdown).toContain("### 51. live-read-only-window-operator-evidence-fresh-sibling-intake-evidence");
    expect(markdown).toContain("### 52. live-read-only-window-operator-evidence-fresh-sibling-intake-slot-builder");
    expect(markdown).toContain("### 53. live-read-only-window-operator-evidence-fresh-sibling-intake-artifacts");
    expect(markdown).toContain("### 54. live-read-only-window-operator-evidence-fresh-sibling-intake-renderer");
    expect(markdown).toContain("### 55. live-read-only-window-operator-evidence-value-supply-envelope-types");
    expect(markdown).toContain("### 56. live-read-only-window-operator-evidence-value-supply-envelope-evidence");
    expect(markdown).toContain("### 57. live-read-only-window-operator-evidence-value-supply-envelope-slot-builder");
    expect(markdown).toContain("### 58. live-read-only-window-operator-evidence-value-supply-envelope-artifacts");
    expect(markdown).toContain("### 59. live-read-only-window-operator-evidence-value-supply-envelope-renderer");
    expect(markdown)
      .toContain("### 60. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-types");
    expect(markdown)
      .toContain("### 61. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-evidence");
    expect(markdown)
      .toContain("### 62. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-policy-catalog");
    expect(markdown)
      .toContain("### 63. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-slot-builder");
    expect(markdown)
      .toContain("### 64. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-artifacts");
    expect(markdown)
      .toContain("### 65. live-read-only-window-operator-evidence-value-supply-approval-packet-draft-renderer");
    expect(markdown)
      .toContain("### 66. live-read-only-window-operator-evidence-value-supply-approval-packet-review-types");
    expect(markdown)
      .toContain("### 67. live-read-only-window-operator-evidence-value-supply-approval-packet-review-control-catalog");
    expect(markdown)
      .toContain("### 68. live-read-only-window-operator-evidence-value-supply-approval-packet-review-slot-builder");
    expect(markdown)
      .toContain("### 69. live-read-only-window-operator-evidence-value-supply-approval-packet-review-artifacts");
    expect(markdown)
      .toContain("### 70. live-read-only-window-operator-evidence-value-supply-approval-packet-review-renderer");
    expect(markdown)
      .toContain("### 71. live-read-only-window-operator-evidence-value-supply-signed-approval-template-types");
    expect(markdown)
      .toContain("### 72. live-read-only-window-operator-evidence-value-supply-signed-approval-template-field-catalog");
    expect(markdown)
      .toContain("### 73. live-read-only-window-operator-evidence-value-supply-signed-approval-template-clause-catalog");
    expect(markdown)
      .toContain("### 74. live-read-only-window-operator-evidence-value-supply-signed-approval-template-builder");
    expect(markdown)
      .toContain("### 75. live-read-only-window-operator-evidence-value-supply-signed-approval-template-validator");
    expect(markdown)
      .toContain("### 76. live-read-only-window-operator-evidence-value-supply-signed-approval-template-artifacts");
    expect(markdown)
      .toContain("### 77. live-read-only-window-operator-evidence-value-supply-signed-approval-template-renderer");
    expect(markdown)
      .toContain("### 78. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-types");
    expect(markdown)
      .toContain("### 79. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-input-catalog");
    expect(markdown)
      .toContain("### 80. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-attestation-catalog");
    expect(markdown)
      .toContain("### 81. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-builder");
    expect(markdown)
      .toContain("### 82. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-validator");
    expect(markdown)
      .toContain("### 83. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-artifacts");
    expect(markdown)
      .toContain("### 84. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-preflight-renderer");
    expect(markdown)
      .toContain("### 85. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-types");
    expect(markdown)
      .toContain("### 86. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-fragment-catalog");
    expect(markdown)
      .toContain("### 87. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-seal-catalog");
    expect(markdown)
      .toContain("### 88. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-builder");
    expect(markdown)
      .toContain("### 89. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-validator");
    expect(markdown)
      .toContain("### 90. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-artifacts");
    expect(markdown)
      .toContain("### 91. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-preflight-renderer");
    expect(markdown)
      .toContain("### 92. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-types");
    expect(markdown)
      .toContain("### 93. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-field-catalog");
    expect(markdown)
      .toContain("### 94. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-guard-catalog");
    expect(markdown)
      .toContain("### 95. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-builder");
    expect(markdown)
      .toContain("### 96. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-validator");
    expect(markdown)
      .toContain("### 97. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-artifacts");
    expect(markdown)
      .toContain("### 98. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-preflight-renderer");
    expect(markdown)
      .toContain("### 99. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-types");
    expect(markdown)
      .toContain("### 100. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-lane-catalog");
    expect(markdown)
      .toContain("### 101. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-control-catalog");
    expect(markdown)
      .toContain("### 102. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-builder");
    expect(markdown)
      .toContain("### 103. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-validator");
    expect(markdown)
      .toContain("### 104. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-artifacts");
    expect(markdown)
      .toContain("### 105. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-readiness-renderer");
    expect(markdown)
      .toContain("### 106. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-types");
    expect(markdown)
      .toContain("### 107. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-slot-catalog");
    expect(markdown)
      .toContain("### 108. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-guard-catalog");
    expect(markdown)
      .toContain("### 109. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-builder");
    expect(markdown)
      .toContain("### 110. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-validator");
    expect(markdown)
      .toContain("### 111. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-artifacts");
    expect(markdown)
      .toContain("### 112. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-review-package-preflight-renderer");
    expect(markdown)
      .toContain("### 113. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-types");
    expect(markdown)
      .toContain("### 114. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-requirement-catalog");
    expect(markdown)
      .toContain("### 115. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-blocker-catalog");
    expect(markdown)
      .toContain("### 116. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-builder");
    expect(markdown)
      .toContain("### 117. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-validator");
    expect(markdown)
      .toContain("### 118. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-artifacts");
    expect(markdown)
      .toContain("### 119. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-authoring-readiness-renderer");
    expect(markdown)
      .toContain("### 120. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-types");
    expect(markdown)
      .toContain("### 121. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-slot-catalog");
    expect(markdown)
      .toContain("### 122. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-guard-catalog");
    expect(markdown)
      .toContain("### 123. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-builder");
    expect(markdown)
      .toContain("### 124. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-validator");
    expect(markdown)
      .toContain("### 125. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-artifacts");
    expect(markdown)
      .toContain("### 126. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-instruction-preflight-renderer");
    expect(markdown)
      .toContain("### 127. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-types");
    expect(markdown)
      .toContain("### 128. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-field-catalog");
    expect(markdown)
      .toContain("### 129. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-guard-catalog");
    expect(markdown)
      .toContain("### 130. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-builder");
    expect(markdown)
      .toContain("### 131. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-validator");
    expect(markdown)
      .toContain("### 132. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-artifacts");
    expect(markdown)
      .toContain("### 133. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-intake-renderer");
    expect(markdown)
      .toContain("### 134. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-types");
    expect(markdown)
      .toContain("### 135. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-criterion-catalog");
    expect(markdown)
      .toContain("### 136. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-control-catalog");
    expect(markdown)
      .toContain("### 137. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-builder");
    expect(markdown)
      .toContain("### 138. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-validator");
    expect(markdown)
      .toContain("### 139. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-artifacts");
    expect(markdown)
      .toContain("### 140. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-review-preflight-renderer");
    expect(markdown)
      .toContain("### 141. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-types");
    expect(markdown)
      .toContain("### 142. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-slot-catalog");
    expect(markdown)
      .toContain("### 143. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-comparison-control-catalog");
    expect(markdown)
      .toContain("### 144. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-builder");
    expect(markdown)
      .toContain("### 145. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-validator");
    expect(markdown)
      .toContain("### 146. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-artifacts");
    expect(markdown)
      .toContain("### 147. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-submission-preflight-renderer");
    expect(markdown)
      .toContain("### 148. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-types");
    expect(markdown)
      .toContain("### 149. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-lane-catalog");
    expect(markdown)
      .toContain("### 150. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-acceptance-control-catalog");
    expect(markdown)
      .toContain("### 151. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-builder");
    expect(markdown)
      .toContain("### 152. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-validator");
    expect(markdown)
      .toContain("### 153. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-artifacts");
    expect(markdown)
      .toContain("### 154. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-preflight-renderer");
    expect(markdown)
      .toContain("### 155. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-types");
    expect(markdown)
      .toContain("### 156. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-check-catalog");
    expect(markdown)
      .toContain("### 157. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-guard-catalog");
    expect(markdown)
      .toContain("### 158. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-builder");
    expect(markdown)
      .toContain("### 159. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-validator");
    expect(markdown)
      .toContain("### 160. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-artifacts");
    expect(markdown)
      .toContain("### 161. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-comparison-acceptance-precheck-renderer");
    expect(markdown)
      .toContain("### 162. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-package-evidence-intake-types");
    expect(markdown)
      .toContain("### 163. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-package-evidence-intake-catalog");
    expect(markdown)
      .toContain("### 164. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-package-evidence-intake-builder");
    expect(markdown)
      .toContain("### 165. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-package-evidence-intake-validator");
    expect(markdown)
      .toContain("### 166. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-package-evidence-intake-artifacts");
    expect(markdown)
      .toContain("### 167. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-package-evidence-intake-renderer");
    expect(markdown)
      .toContain("### 168. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-evaluation-preflight-types");
    expect(markdown)
      .toContain("### 169. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-evaluation-preflight-catalog");
    expect(markdown)
      .toContain("### 170. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-evaluation-preflight-builder");
    expect(markdown)
      .toContain("### 171. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-evaluation-preflight-validator");
    expect(markdown)
      .toContain("### 172. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-evaluation-preflight-artifacts");
    expect(markdown)
      .toContain("### 173. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-evaluation-preflight-renderer");
    expect(markdown)
      .toContain("### 174. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-types");
    expect(markdown)
      .toContain("### 175. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-catalog");
    expect(markdown)
      .toContain("### 176. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-builder");
    expect(markdown)
      .toContain("### 177. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-artifacts");
    expect(markdown)
      .toContain("### 178. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-renderer");
    expect(markdown)
      .toContain("### 179. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-intake-types");
    expect(markdown)
      .toContain("### 180. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-intake-catalog");
    expect(markdown)
      .toContain("### 181. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-intake-builder");
    expect(markdown)
      .toContain("### 182. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-intake-artifacts");
    expect(markdown)
      .toContain("### 183. live-read-only-window-operator-evidence-value-supply-signed-approval-capture-artifact-draft-text-package-compared-evidence-candidate-intake-renderer");
    expect(markdown).toContain("### 184. candidate-document-request-types");
    expect(markdown).toContain("### 185. candidate-document-request-catalog");
    expect(markdown).toContain("### 186. candidate-document-request-builder");
    expect(markdown).toContain("### 187. candidate-document-request-artifacts");
    expect(markdown).toContain("### 188. candidate-document-request-renderer");
    expect(markdown).toContain("### 189. candidate-document-submission-precheck-types");
    expect(markdown).toContain("### 190. candidate-document-submission-precheck-catalog");
    expect(markdown).toContain("### 191. candidate-document-submission-precheck-builder");
    expect(markdown).toContain("### 192. candidate-document-submission-precheck-artifacts");
    expect(markdown).toContain("### 193. candidate-document-submission-precheck-renderer");
    expect(markdown).toContain("### 194. candidate-document-intake-packet-types");
    expect(markdown).toContain("### 195. candidate-document-intake-packet-catalog");
    expect(markdown).toContain("### 196. candidate-document-intake-packet-builder");
    expect(markdown).toContain("### 197. candidate-document-intake-packet-artifacts");
    expect(markdown).toContain("### 198. candidate-document-intake-packet-renderer");
    expect(markdown).toContain("### 199. candidate-document-material-request-types");
    expect(markdown).toContain("### 200. candidate-document-material-request-catalog");
    expect(markdown).toContain("### 201. candidate-document-material-request-builder");
    expect(markdown).toContain("### 202. candidate-document-material-request-artifacts");
    expect(markdown).toContain("### 203. candidate-document-material-request-renderer");
    expect(markdown).toContain("### 204. candidate-document-material-submission-precheck-types");
    expect(markdown).toContain("### 205. candidate-document-material-submission-precheck-catalog");
    expect(markdown).toContain("### 206. candidate-document-material-submission-precheck-builder");
    expect(markdown).toContain("### 207. candidate-document-material-submission-precheck-artifacts");
    expect(markdown).toContain("### 208. candidate-document-material-submission-precheck-renderer");
    expect(markdown).toContain("### 209. candidate-document-profile-section-renderer");
    expect(markdown).toContain("### 210. signed-approval-artifact-draft-profile-section-renderer");
    expect(markdown).toContain("### 211. signed-approval-artifact-draft-text-package-profile-section-renderer");
    expect(markdown).toContain("### 212. signed-approval-artifact-draft-text-package-submission-profile-section-renderer");
    expect(markdown).toContain("### 213. signed-approval-artifact-draft-text-package-compared-evidence-profile-section-renderer");
    expect(markdown).toContain("### 214. operator-evidence-value-supply-approval-profile-section-renderer");
    expect(markdown).toContain("### 215. operator-evidence-value-supply-approval-packet-profile-section-renderer");
    expect(markdown).toContain("### 216. operator-evidence-value-supply-signed-approval-capture-profile-section-renderer");
    expect(markdown).toContain("### 217. profile-entry-types");
    expect(markdown).toContain("- Stable profile re-export: true");
  });

  it("validates catalog uniqueness, order, and stable re-export coverage", () => {
    const validation = validateControlledReadOnlyShardPreviewTypeModuleCatalog();

    expect(validation).toMatchObject({
      validationVersion: "Node v1556",
      valid: true,
      moduleCount: 217,
      uniqueIdCount: 217,
      uniquePathCount: 217,
      stableReExportModuleCount: 217,
      sequentialOrder: true,
      profileEntryLast: true,
      blockedReasonCodes: [],
      requiresFreshSiblingEvidence: true,
      startsServices: false,
      mutatesSiblingState: false,
    });
  });

  it("reports catalog boundary drift", () => {
    const catalog = createControlledReadOnlyShardPreviewTypeModuleCatalog();
    const driftedCatalog = {
      ...catalog,
      entries: catalog.entries.map((entry, index) =>
        index === 1 ? { ...entry, id: catalog.entries[0].id } : entry
      ),
    };

    const validation = validateControlledReadOnlyShardPreviewTypeModuleCatalog(driftedCatalog);

    expect(validation.valid).toBe(false);
    expect(validation.blockedReasonCodes).toContain("TYPE_MODULE_IDS_NOT_UNIQUE");
  });
});
