import { describe, expect, it } from "vitest";

import {
  renderVerificationArchiveFileReferenceLines,
  renderVerificationBlockedReasonLines,
  renderVerificationEvidenceFileReferenceLines,
  renderVerificationReportMarkdown,
  renderVerificationResolvedEvidenceFileDetailLines,
  renderVerificationSeparatedBlockLines,
  trimVerificationTrailingBlankLine,
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

  it("does not add a duplicate blank line when the first section follows an empty meta block", () => {
    const markdown = renderVerificationReportMarkdown({
      title: "Summary first report",
      meta: [],
      sections: [
        { heading: "Summary", lines: ["- ok"], bodyLeadingBlankLine: false },
      ],
    });

    expect(markdown).toBe([
      "# Summary first report",
      "",
      "## Summary",
      "- ok",
      "",
    ].join("\n"));
  });

  it("preserves explicit trailing blank lines before later sections", () => {
    const markdown = renderVerificationReportMarkdown({
      title: "Legacy carried report",
      meta: [],
      sections: [
        { heading: "Rows", lines: ["### one", "- ok", ""], bodyLeadingBlankLine: false },
        { heading: "Next", lines: ["- done"], bodyLeadingBlankLine: false },
      ],
      trailingNewline: false,
    });

    expect(markdown).toContain("### one\n- ok\n\n\n## Next");
  });

  it("can preserve legacy adjacent section headings without inserting a separator", () => {
    const markdown = renderVerificationReportMarkdown({
      title: "Adjacent headings",
      meta: [["State", "ready"]],
      sections: [
        { heading: "Rows", lines: ["- one"] },
        { heading: "Evidence", lines: ["- two"], headingLeadingBlankLine: false },
      ],
    });

    expect(markdown).toContain("## Rows\n\n- one\n## Evidence\n\n- two");
  });


  it("can preserve compact section spacing and reports without trailing newlines", () => {
    const markdown = renderVerificationReportMarkdown({
      title: "Compact report",
      meta: [["State", "ready"]],
      trailingNewline: false,
      sections: [
        { heading: "Gates", entries: { ready: true }, bodyLeadingBlankLine: false },
        { heading: "Rows", lines: ["### 1. compact", "- ok"], bodyLeadingBlankLine: false },
      ],
    });

    expect(markdown).toBe([
      "# Compact report",
      "",
      "- State: ready",
      "",
      "## Gates",
      "- ready: true",
      "",
      "## Rows",
      "### 1. compact",
      "- ok",
    ].join("\n"));
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

  it("renders evidence file references in the route catalog cleanup line format", () => {
    expect(renderVerificationEvidenceFileReferenceLines([
      { id: "java", exists: true, resolvedPath: "fixtures/java.json", digest: "def456" },
      { id: "mini-kv", exists: false, resolvedPath: "fixtures/mini-kv.json", digest: null },
    ])).toEqual([
      "- java: present",
      "  - Resolved path: fixtures/java.json",
      "  - SHA-256: def456",
      "- mini-kv: missing",
      "  - Resolved path: fixtures/mini-kv.json",
      "  - SHA-256: missing",
    ]);
  });

  it("renders blocked reason lines in the compact report format", () => {
    expect(renderVerificationBlockedReasonLines([])).toEqual(["- none"]);
    expect(renderVerificationBlockedReasonLines(["SOURCE_BLOCKED", "TARGET_BLOCKED"])).toEqual([
      "- SOURCE_BLOCKED",
      "- TARGET_BLOCKED",
    ]);
  });

  it("renders resolved evidence file detail blocks without a trailing blank line", () => {
    expect(renderVerificationResolvedEvidenceFileDetailLines([
      {
        id: "java-closeout",
        path: "fixtures/java.md",
        resolvedPath: "fixtures/historical/java.md",
        exists: true,
        sizeBytes: 123,
        digest: "abc123",
      },
      {
        id: "mini-kv-closeout",
        path: "fixtures/mini-kv.md",
        resolvedPath: "fixtures/historical/mini-kv.md",
        exists: false,
        sizeBytes: 0,
      },
    ])).toEqual([
      "### java-closeout",
      "- Path: fixtures/java.md",
      "- Resolved path: fixtures/historical/java.md",
      "- Exists: true",
      "- Size bytes: 123",
      "- Digest: abc123",
      "",
      "### mini-kv-closeout",
      "- Path: fixtures/mini-kv.md",
      "- Resolved path: fixtures/historical/mini-kv.md",
      "- Exists: false",
      "- Size bytes: 0",
      "- Digest: none",
    ]);
  });

  it("trims a single trailing blank line when carrying legacy h3 blocks into sections", () => {
    expect(trimVerificationTrailingBlankLine(["### one", "- Value: true", ""]))
      .toEqual(["### one", "- Value: true"]);
    expect(trimVerificationTrailingBlankLine(["### one", "- Value: true"]))
      .toEqual(["### one", "- Value: true"]);
  });

  it("renders separated h3 blocks without leading or trailing blank lines", () => {
    expect(renderVerificationSeparatedBlockLines(
      ["one", "two"],
      (item) => [`### ${item}`, "- ok"],
    )).toEqual([
      "### one",
      "- ok",
      "",
      "### two",
      "- ok",
    ]);
  });
});
