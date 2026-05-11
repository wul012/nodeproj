import { describe, expect, it } from "vitest";

import { dashboardHtml } from "../src/ui/dashboard.js";

describe("dashboardHtml", () => {
  it("renders upstream overview detail panels for v56", () => {
    const html = dashboardHtml();

    expect(html).toContain("Upstream Overview");
    expect(html).toContain('id="overviewOverallState"');
    expect(html).toContain('id="javaFailedSummarySignal"');
    expect(html).toContain('id="javaBacklogSignal"');
    expect(html).toContain('id="kvIdentitySignal"');
    expect(html).toContain('id="kvCommandSignal"');
    expect(html).toContain('id="kvRiskSignal"');
    expect(html).toContain('id="failedEventId"');
    expect(html).toContain("Replay Readiness");
    expect(html).toContain("refreshFailedEventReadiness");
    expect(html).toContain('id="kvPrefix"');
    expect(html).toContain("Key Inventory");
    expect(html).toContain("refreshMiniKvKeyInventory");
    expect(html).toContain("Preflight");
    expect(html).toContain('data-action="intentPreflight"');
    expect(html).toContain('data-action="intentPreflightReport"');
    expect(html).toContain('data-action="intentPreflightVerification"');
    expect(html).toContain('data-action="intentExecutionPreview"');
    expect(html).toContain('data-action="createApprovalRequest"');
    expect(html).toContain('data-action="listApprovalRequests"');
    expect(html).toContain('id="approvalRequestId"');
    expect(html).toContain('data-action="approveApprovalRequest"');
    expect(html).toContain('data-action="rejectApprovalRequest"');
    expect(html).toContain('data-action="listApprovalDecisions"');
    expect(html).toContain("failed-event-replay-simulation");
    expect(html).toContain("/preflight");
    expect(html).toContain("/preflight/report");
    expect(html).toContain("/preflight/verification");
    expect(html).toContain("/execution-preview");
    expect(html).toContain("/api/v1/operation-approval-requests");
    expect(html).toContain("/api/v1/operation-approval-decisions");
    expect(html).toContain("/decision");
    expect(html).toContain("function renderUpstreamOverview");
    expect(html).toContain("refreshUpstreamOverview");
  });
});
