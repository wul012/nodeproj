import { describe, expect, it } from "vitest";

import { collectBlockedReasons } from "../src/services/blockedReasonKernel.js";

describe("blocked reason rules", () => {
  it("keeps only failed rules in declaration order", () => {
    expect(collectBlockedReasons([
      [true, "FIRST_PASSED"],
      [false, "SECOND_FAILED"],
      [true, "THIRD_PASSED"],
      [false, "FOURTH_FAILED"],
    ])).toEqual(["SECOND_FAILED", "FOURTH_FAILED"]);
  });

  it("does not hide repeated failure evidence", () => {
    expect(collectBlockedReasons([
      [false, "SAME_REASON"],
      [false, "SAME_REASON"],
    ])).toEqual(["SAME_REASON", "SAME_REASON"]);
  });
});
