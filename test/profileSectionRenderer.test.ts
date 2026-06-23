import { describe, expect, it } from "vitest";

import {
  renderProfileEntrySection,
  renderProfileEntrySections,
} from "../src/services/liveProbeReportUtils.js";

describe("profileSectionRenderer", () => {
  it("renders local profile fragments without full-report title or meta handling", () => {
    expect(renderProfileEntrySection({
      heading: "Local Section",
      lines: ["- ready: true", "- count: 2"],
    })).toEqual([
      "## Local Section",
      "- ready: true",
      "- count: 2",
      "",
    ]);
  });

  it("concatenates multiple profile fragments with the legacy blank separator", () => {
    expect(renderProfileEntrySections([
      { heading: "One", lines: ["- alpha: true"] },
      { heading: "Two", lines: ["- beta: ok"] },
    ])).toEqual([
      "## One",
      "- alpha: true",
      "",
      "## Two",
      "- beta: ok",
      "",
    ]);
  });
});
