import { describe, expect, it } from "vitest";

import {
  readinessConnectionFields,
  renderReadinessDocument,
  renderReadinessEntries,
  renderReadinessItems,
  renderReadinessList,
  renderReadinessMessages,
} from "../src/services/readinessMarkdownEngine.js";

describe("readiness Markdown engine", () => {
  it("preserves the single category separator owned by the document", () => {
    const categories = renderReadinessItems([{ id: "identity", ready: true }], (category) => [
      ["Ready", category.ready],
    ]);

    expect(renderReadinessDocument("Readiness", [["State", "blocked"]], [
      ["Categories", categories],
      ["Next Actions", renderReadinessList([], "No next actions.")],
    ])).toBe([
      "# Readiness",
      "",
      "- State: blocked",
      "",
      "## Categories",
      "",
      "### identity",
      "",
      "- Ready: true",
      "",
      "## Next Actions",
      "",
      "- No next actions.",
      "",
    ].join("\n"));
  });

  it("keeps optional message categories in their original position", () => {
    expect(renderReadinessMessages([
      { code: "A", severity: "warning", source: "source-a", message: "plain" },
      { code: "B", severity: "blocker", category: "auth", source: "source-b", message: "scoped" },
    ], "empty")).toEqual([
      "- A (warning, source-a): plain",
      "- B (blocker, auth, source-b): scoped",
    ]);
  });

  it("formats prefixed entries and shared connection fields", () => {
    expect(renderReadinessEntries({ missing: undefined, name: "node", ready: false }, "check")).toEqual([
      "- check.missing: unknown",
      "- check.name: node",
      "- check.ready: false",
    ]);
    expect(readinessConnectionFields({
      productionConnected: false,
      status: "blocked",
      evidence: "fixture",
      note: "read only",
    }, ["Candidate passes", true])).toEqual([
      ["Candidate passes", true],
      ["Production connected", false],
      ["Status", "blocked"],
      ["Evidence", "fixture"],
      ["Note", "read only"],
    ]);
  });
});
