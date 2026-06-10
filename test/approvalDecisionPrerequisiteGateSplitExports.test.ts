import { describe, expect, it } from "vitest";

import {
  loadApprovalDecisionPrerequisiteGate,
  renderApprovalDecisionPrerequisiteGateMarkdown,
} from "../src/services/approvalDecisionPrerequisiteGate.js";
import { loadApprovalDecisionPrerequisiteGate as loadApprovalDecisionPrerequisiteGateCore } from "../src/services/approvalDecisionPrerequisiteGateCore.js";
import { renderApprovalDecisionPrerequisiteGateMarkdown as renderApprovalDecisionPrerequisiteGateMarkdownModule } from "../src/services/approvalDecisionPrerequisiteGateMarkdownRenderers.js";

describe("Approval decision prerequisite gate split exports", () => {
  it("keeps the barrel aligned with the split modules", () => {
    expect(loadApprovalDecisionPrerequisiteGate).toBe(loadApprovalDecisionPrerequisiteGateCore);
    expect(renderApprovalDecisionPrerequisiteGateMarkdown).toBe(renderApprovalDecisionPrerequisiteGateMarkdownModule);
  });
});
