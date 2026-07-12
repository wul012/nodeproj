import { describe, expect, it } from "vitest";

import {
  formatMarkdownDigest,
  optionalMarkdownValue,
  renderMarkdownBullets,
  renderMarkdownDocument,
  renderMarkdownItems,
} from "../src/services/promotionMarkdownEngine.js";

describe("promotion Markdown engine", () => {
  it("preserves document, section, and item separators", () => {
    const items = renderMarkdownItems([{ name: "artifact", valid: true }], (item) => [
      ["Valid", item.valid],
    ]);

    expect(renderMarkdownDocument("Title", [["State", "ready"]], [
      ["Items", items],
      ["Next Actions", renderMarkdownBullets(["ship"])],
    ])).toBe([
      "# Title",
      "",
      "- State: ready",
      "",
      "## Items",
      "",
      "### artifact",
      "",
      "- Valid: true",
      "",
      "",
      "## Next Actions",
      "",
      "- ship",
      "",
    ].join("\n"));
  });

  it("formats digests and absent values without policy knowledge", () => {
    expect(formatMarkdownDigest({ algorithm: "sha256", value: "abc" })).toBe("sha256:abc");
    expect(optionalMarkdownValue(undefined)).toBe("none");
    expect(optionalMarkdownValue(false)).toBe(false);
    expect(optionalMarkdownValue(0)).toBe(0);
  });
});
