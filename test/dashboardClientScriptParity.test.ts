import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { dashboardClientActionsScript } from "../src/ui/dashboardClientActionsScript.js";
import { dashboardClientCoreScript } from "../src/ui/dashboardClientCoreScript.js";
import { dashboardClientOperationsScript } from "../src/ui/dashboardClientOperationsScript.js";
import { dashboardClientScript } from "../src/ui/dashboardClientScript.js";

describe("dashboard client script split parity", () => {
  it("preserves the complete browser artifact byte-for-byte", () => {
    expect(dashboardClientScript).toBe(
      dashboardClientCoreScript + dashboardClientOperationsScript + dashboardClientActionsScript,
    );
    expect(dashboardClientScript).toHaveLength(51_041);
    expect(createHash("sha256").update(dashboardClientScript).digest("hex")).toBe(
      "5771c499a2987853de06731340221b5ad800930431da59f1b80439f4645c7f3f",
    );
    expect(dashboardClientScript.startsWith("\n")).toBe(true);
    expect(dashboardClientScript.endsWith("\n")).toBe(true);
  });
});
