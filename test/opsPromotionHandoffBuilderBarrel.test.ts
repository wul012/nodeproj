import { describe, expect, it } from "vitest";

import * as handoffBuilders from "../src/services/opsPromotionArchiveHandoffBuilders.js";
import * as certificateBuilders from "../src/services/opsPromotionArchiveHandoffCertificateBuilders.js";
import * as closureBuilders from "../src/services/opsPromotionArchiveHandoffClosureBuilders.js";
import * as completionBuilders from "../src/services/opsPromotionArchiveHandoffCompletionBuilders.js";
import * as packageBuilders from "../src/services/opsPromotionArchiveHandoffPackageBuilders.js";
import * as receiptBuilders from "../src/services/opsPromotionArchiveHandoffReceiptBuilders.js";

describe("ops promotion handoff builder barrel", () => {
  it("re-exports package builders from the package module", () => {
    expect(handoffBuilders.createOpsPromotionHandoffPackage).toBe(packageBuilders.createOpsPromotionHandoffPackage);
    expect(handoffBuilders.createOpsPromotionHandoffPackageVerification)
      .toBe(packageBuilders.createOpsPromotionHandoffPackageVerification);
  });

  it("re-exports certificate builders from the certificate module", () => {
    expect(handoffBuilders.createOpsPromotionHandoffCertificate)
      .toBe(certificateBuilders.createOpsPromotionHandoffCertificate);
    expect(handoffBuilders.createOpsPromotionHandoffCertificateVerification)
      .toBe(certificateBuilders.createOpsPromotionHandoffCertificateVerification);
  });

  it("re-exports receipt builders from the receipt module", () => {
    expect(handoffBuilders.createOpsPromotionHandoffReceipt).toBe(receiptBuilders.createOpsPromotionHandoffReceipt);
    expect(handoffBuilders.createOpsPromotionHandoffReceiptVerification)
      .toBe(receiptBuilders.createOpsPromotionHandoffReceiptVerification);
  });

  it("re-exports closure builders from the closure module", () => {
    expect(handoffBuilders.createOpsPromotionHandoffClosure).toBe(closureBuilders.createOpsPromotionHandoffClosure);
    expect(handoffBuilders.createOpsPromotionHandoffClosureVerification)
      .toBe(closureBuilders.createOpsPromotionHandoffClosureVerification);
  });

  it("re-exports completion builders from the completion module", () => {
    expect(handoffBuilders.createOpsPromotionHandoffCompletion)
      .toBe(completionBuilders.createOpsPromotionHandoffCompletion);
    expect(handoffBuilders.createOpsPromotionHandoffCompletionVerification)
      .toBe(completionBuilders.createOpsPromotionHandoffCompletionVerification);
  });
});
