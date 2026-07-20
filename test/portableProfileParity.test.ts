import { describe, expect, it } from "vitest";

import { normalizeForParity, normalizeText } from "./support/portableProfileParity.js";

describe("portable profile parity", () => {
  it("normalizes runtime and declared repository roots on every host", () => {
    expect(normalizeText("/workspace/orderops-node/src/service.ts", "/workspace/orderops-node"))
      .toBe("<repo>/src/service.ts");
    expect(normalizeText("D:\\nodeproj\\orderops-node\\src\\service.ts", "/workspace/orderops-node"))
      .toBe("<repo>/src/service.ts");
    expect(normalizeText("D:/nodeproj/orderops-node-copy/src/service.ts", "/workspace/orderops-node"))
      .toBe("D:/nodeproj/orderops-node-copy/src/service.ts");
  });

  it("normalizes repository roots recursively without changing other values", () => {
    expect(normalizeForParity({
      source: "D:/nodeproj/orderops-node/src/service.ts",
      nested: ["D:\\nodeproj\\orderops-node\\test\\service.test.ts", 3, false],
    })).toEqual({
      source: "<repo>/src/service.ts",
      nested: ["<repo>/test/service.test.ts", 3, false],
    });
  });
});
