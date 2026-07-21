import { describe, expect, it } from "vitest";

import { resolveShardArtifactState } from "../src/services/shardArtifactState.js";

describe("shard artifact state", () => {
  it("marks an artifact ready only when no blocker remains", () => {
    expect(resolveShardArtifactState([], { version: "v1" }).ready).toBe(true);
    expect(resolveShardArtifactState(["MISSING_APPROVAL"], { version: "v1" }).ready).toBe(false);
  });

  it("keeps the digest stable when object key order differs", () => {
    const first = resolveShardArtifactState([], { version: "v1", count: 2 });
    const second = resolveShardArtifactState([], { count: 2, version: "v1" });

    expect(first.digest).toMatch(/^[a-f0-9]{64}$/);
    expect(second.digest).toBe(first.digest);
  });
});
