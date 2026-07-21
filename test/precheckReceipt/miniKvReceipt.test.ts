import { describe, expect, it } from "vitest";

import { createMiniKvV108Receipt } from "../../src/services/precheckReceipt/miniKvReceipt.js";

const RECEIPT_KEY = "manual_sandbox_connection_precheck_non_participation_receipt";

describe("mini-kv v108 receipt narrowing", () => {
  it("preserves explicit empty, zero, and false values before nested compatibility fields", () => {
    const receipt = createMiniKvV108Receipt({
      receipt_version: "",
      source_precheck_packet: {
        precheck_item_count: 0,
        execution_allowed: false,
      },
      [RECEIPT_KEY]: {
        receipt_version: "nested-version",
        source_precheck_item_count: 7,
        source_execution_allowed: true,
      },
    });

    expect(receipt.receiptVersion).toBe("");
    expect(receipt.sourcePrecheckItemCount).toBe(0);
    expect(receipt.sourceExecutionAllowed).toBe(false);
    expect(receipt.readyForNodeV247Alignment).toBe(false);
  });

  it("fails closed when required fields are missing or have the wrong runtime type", () => {
    const receipt = createMiniKvV108Receipt({
      receipt_version: 108,
      source_precheck_packet: {
        ready_for_precheck_packet: "true",
        execution_allowed: "false",
        operator_review_fields: ["valid", 1],
      },
      [RECEIPT_KEY]: {
        storage_write_allowed: "false",
        dry_run_only: "true",
      },
    });

    expect(receipt).toMatchObject({
      receiptVersion: "missing",
      sourceReadyForPrecheckPacket: false,
      sourceExecutionAllowed: true,
      operatorReviewFields: [],
      storageWriteAllowed: true,
      dryRunOnly: false,
      readyForNodeV247Alignment: false,
    });
  });
});
