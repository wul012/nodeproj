import { describe, expect, it } from "vitest";

import { digestStable, stableJson } from "../src/services/stableDigest.js";

describe("stableDigest", () => {
  it("serializes object keys in stable sorted order", () => {
    expect(stableJson({ z: 1, a: { d: 4, b: 2 }, c: [3, { y: true, x: false }] })).toBe(
      '{"a":{"b":2,"d":4},"c":[3,{"x":false,"y":true}],"z":1}',
    );
  });

  it("keeps the archive bundle undefined-as-null digest contract", () => {
    expect(stableJson({ present: "yes", missing: undefined })).toBe('{"missing":null,"present":"yes"}');
    expect(digestStable({ b: 2, a: 1 })).toBe(digestStable({ a: 1, b: 2 }));
  });
});
