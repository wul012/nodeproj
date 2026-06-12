import { describe, expect, it } from "vitest";

import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationReportMarkdown,
} from "../src/services/verificationReportBuilder.js";

describe("verificationReportBuilder", () => {
  it("renders title, meta lines, and all section kinds in the canonical renderer shape", () => {
    const markdown = renderVerificationReportMarkdown({
      title: "Sample verification report",
      meta: [
        ["Service", "sample-service"],
        ["Ready", true],
        ["Count", 3],
      ],
      sections: [
        { heading: "Checks", entries: { alpha: true, beta: "ok", gamma: 2 } },
        {
          heading: "Production Blockers",
          messages: [
            { code: "BLOCKED", severity: "blocker", source: "node", message: "still blocked" },
          ],
          emptyText: "No blockers.",
        },
        { heading: "Next Actions", list: ["do the thing"], emptyText: "No next actions." },
        { heading: "Custom", lines: ["- raw line", "", "### Nested", "", "- nested line"] },
      ],
    });

    expect(markdown).toBe([
      "# Sample verification report",
      "",
      "- Service: sample-service",
      "- Ready: true",
      "- Count: 3",
      "",
      "## Checks",
      "",
      "- alpha: true",
      "- beta: ok",
      "- gamma: 2",
      "",
      "## Production Blockers",
      "",
      "- BLOCKED (blocker, node): still blocked",
      "",
      "## Next Actions",
      "",
      "- do the thing",
      "",
      "## Custom",
      "",
      "- raw line",
      "",
      "### Nested",
      "",
      "- nested line",
      "",
    ].join("\n"));
  });

  it("renders empty-state text for message and list sections", () => {
    const markdown = renderVerificationReportMarkdown({
      title: "Empty report",
      meta: [],
      sections: [
        { heading: "Warnings", messages: [], emptyText: "No warnings." },
        { heading: "Next Actions", list: [], emptyText: "No next actions." },
      ],
    });

    expect(markdown).toContain("## Warnings\n\n- No warnings.");
    expect(markdown).toContain("## Next Actions\n\n- No next actions.");
    expect(markdown.endsWith("\n")).toBe(true);
  });

  it("renders archive file references in the established verification line format", () => {
    expect(renderVerificationArchiveFileReferenceLines([
      { path: "d/2123/evidence/report.json", exists: true, byteLength: 128, digest: "abc123" },
      { path: "d/2123/图片/report.png", exists: false, byteLength: 0, digest: null },
    ])).toEqual([
      "- d/2123/evidence/report.json: exists=true; bytes=128; digest=abc123",
      "- d/2123/图片/report.png: exists=false; bytes=0; digest=missing",
    ]);
  });
});
