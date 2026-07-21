import { createHash } from "node:crypto";

import type { FastifyInstance } from "fastify";
import { afterEach, describe, expect, it, vi } from "vitest";

import { buildApp } from "../src/app.js";
import { createRuntimeDeps } from "../src/app/runtimeDeps.js";
import { loadConfig } from "../src/config.js";
import { PROMOTION_ARCHIVE_ROUTES } from "../src/routes/promotionArchive/routeManifest.js";
import { OpsPromotionDecisionLedger } from "../src/services/opsPromotionDecision.js";

const emptyDigests: Record<string, string> = {
  bundle: "679:325b7b7618a889b9583d09136f49a6f363b4762028d095ba4470eae9c77de85d",
  manifest: "1288:3fe000991b709bdf3e506aa75bfd5c7b42d893875b14b0fb3e75164f5479de28",
  archiveVerification: "1734:5edc80bad6f5ee2ca40a50a7bd6ee011ba4cb0d8230c0677df1541ebcd0ecff0",
  attestation: "1759:8918f9000b8248a89d12276ca6353c9befc67229acc53f5381b99d8fad38141b",
  attestationVerification: "1109:97016f486308647a4120f2ddc2aa33a91b4fe007d4a50976cdeddf1e8636e26e",
  handoffPackage: "1887:d35b0d740ffdd54193c31cf5381235de9fa6b2bed9fc6f44beffb12b2f547913",
  handoffPackageVerification: "2738:7c41e04607f556260f800df94d8b9f9f341bf5a01ec0336d2f47590c85110e01",
  certificate: "2059:f80f3b8a2b0746647f4228d442173e3a1b742c86ac2549234f8045ec7a8146bd",
  certificateVerification: "2924:e04c8db38f327ddd7d28657cde73de3862ab34f8b0b1d85bda427121d2177350",
  receipt: "2494:4a4f13080fb09271de158cdcead6261f1d74f009f30a8829cc94f05b3820c5f5",
  receiptVerification: "3092:b003c46cc3a085ffad55f0dce5f1bb4620170ae3a754d6130885d8c7bf01dcc4",
  closure: "3199:6d49dfccf9697d5dfb7f53137616e5b05816248d3cbfee09b67aa5f516a8ef99",
  closureVerification: "3960:2c82ecb5d631d8a2e0b83127d65b7070933ee6a5ac884426e5e75eb2229e5d80",
  completion: "2872:b761b84f9d491567c6f7a5384a295dd0d888f00e0cf129134209bf9a84a0b1f8",
  completionVerification: "3947:8dda809ba63ff0cd19f90aab098e1d34668cacbb1fe1a273432b85cbc16b318d",
  releaseEvidence: "3033:f26c918d953147908c939a2da7d3ba222bc96d411393579b308703dee35be9a9",
  releaseEvidenceVerification: "3896:a246cdd7c53ec84dc49d2b9ca277d27c989d341fcf94e54eea3c95ebd83a073b",
  releaseArchive: "2848:bea2335a15c71c2b9a76db913e34c448a27403fa7a46ab9dcd79a8210f41016a",
  releaseArchiveVerification: "3593:ac56ac2cbbbc052426621b04e538eaefbb820964b8f5529ccddae81389b4e13d",
  deploymentApproval: "2929:9f1aee01b5a8a4c5b4e0076533d844dd5b76b4ff007714e0f9c9aba86c9f770a",
  deploymentApprovalVerification: "3733:b32dbbb406d1d33beb003015396667db0aecf3f171715318bac66d0a262f611a",
  deploymentChangeRecord: "3016:c6fbcdff052d7a0738eac074087ad0205a0e78e04b410f725970679757386b65",
  deploymentChangeRecordVerification: "3908:1139b81223c969e5c3e6a61b753ed59b54f4704dddc4d11bb807c89c33beee0e",
  deploymentExecutionRecord: "3283:19f8e32d03de6f035ae5aaa8cafe739c8ed34d37f84fa943ee7e9499271cc3e2",
  deploymentExecutionRecordVerification: "4182:69b81ce1a94bee27f3212309cc1c46da7d7df48a71a492a6c41ad7b66b8ee0ad",
  deploymentExecutionReceipt: "3564:5a0face2bae7355381fd3a3ec89b9f2339eea45c0897a9a6b95bf0afc9fc2e8a",
  deploymentExecutionReceiptVerification: "4413:4ca8fc9d25e138411d18d441fdec18c7473de4ae5db4aa35ce0c288c598ced85",
  releaseAuditTrailRecord: "3739:39074c57b6dc87c3b60528ad3deeb25ddb1b858dd53d6d3b846a752ee553030e",
};

const blockedDigests: Record<string, string> = {
  bundle: "1206:e5caaccc006979b49f112da1df492643e4d33b7a48f9b527b2c6e2c790bd8aa0",
  manifest: "1614:293dbca236829fbc75e9559edc70d90691b67dd7fbab1a1592fd6b730b83e0de",
  archiveVerification: "2024:75f15636b5429185b7ea9a74805ebe590661f723e691cac2b8f4da88aff1749e",
  attestation: "1830:55cbceab4f880bf12eba8220f9f3088ff0121b02bca6385806ec76fc3ebf9a08",
  attestationVerification: "1155:2e2f09cb3ca64f583e0a28ddd1bd53ed4fb15ecb667e6e335e1ead766a468d01",
  handoffPackage: "1936:b8997fbe6c4fcb1f7699cf1b08012e1edb2608ab04662f880e13e67638aeda83",
  handoffPackageVerification: "2784:2523819696ff90f9221bea8c82a5c7de6338f156b96ead10475b1230dc197d57",
  certificate: "2108:45838a1010a1ffe510230f2143bcb5ae7808f4fc225e4d8ea925b13626803322",
  certificateVerification: "2970:d02b2c380d0d7e3e6c6084da7bbe89b27c5b5738c8e314aed0d58c426d066141",
  receipt: "2543:aa9c6309a51cd4d8b076b013760ce8085064018fb1eb6f6018f43f04be9e6616",
  receiptVerification: "3138:0e7e0c4b3828e2e6ecc22c130b50cbe3bc15980830ee7afc56675fb003c3c341",
  closure: "3248:a3f448f3f8dd65548e5350508b9426a014cc8b72959b3cb53974b140ce4f5190",
  closureVerification: "4006:57642388f46baa5941aa32047cd3fc37135eaad70ee0e07896239afb4fe74b6e",
  completion: "2921:96f91e8e4836f3a7552d199fe8d7165700f1daa72fd8cc269ce94662781a8e51",
  completionVerification: "3993:f38d276b9c0c3ff17ef414863758e32892a4585cc2f86711d00a06b753ed2071",
  releaseEvidence: "3082:d64575c5f8c0b1b787abd65a9b95b0ec5e8f02922e34f3ef5ee2c0ad9a9f0448",
  releaseEvidenceVerification: "3942:6e6f0ec79f6344573bf5262012715db29e9b45a3776b7ba5d7a073c5a7e1c7a1",
  releaseArchive: "2897:b0e21b567461215952714a24add3e190231831a3af3399c6a5306291ff1ab478",
  releaseArchiveVerification: "3639:1a8b441c528d726aa0647f9b35210db63fbd9ef1fbb014a80877af2bac04a511",
  deploymentApproval: "2978:a9a7c9c469dbeabe91637050a1fa16a9b81c7de064fe787277a5abcb9697787f",
  deploymentApprovalVerification: "3779:a56982cadc4027a3382ffca619fb309016a9b69c5c464223c4bd71f23ad3aadc",
  deploymentChangeRecord: "3065:43413f92602461b5538959868bbf17fea3cb0e5261a4467bb1ce36726d1a71c3",
  deploymentChangeRecordVerification: "3954:c35a3ccda7ba7ae7ae8491183f017c87edd4c1d644a6dfc1bf7d7f259fcc8747",
  deploymentExecutionRecord: "3332:9953e24e12de2cd5e634b26518c28d735da74b37ea83f5282dda9e96ff8e2680",
  deploymentExecutionRecordVerification: "4228:014c797bacafed7963cb5c1aa5dda26799911381298bcb95181fc040a50aa796",
  deploymentExecutionReceipt: "3613:f3661ed3021fa1d13ee2353dac8a76f67b18d816bc409b7acc60260f669641ca",
  deploymentExecutionReceiptVerification: "4459:aa681c4d710142408da5a0df2c766e0336da0fdee7196682736c3bf0549ba0c1",
  releaseAuditTrailRecord: "3788:08c1450418e5df5b4a3724471c7a7806afcdb10d4264aa28370d57c9a2506d9a",
};

async function collectDigests(app: FastifyInstance) {
  const digests: Record<string, string> = {};
  for (const route of PROMOTION_ARCHIVE_ROUTES) {
    const response = await app.inject({
      method: "GET",
      url: `${route.path}?format=markdown`,
    });
    expect(response.statusCode, route.path).toBe(200);
    const hash = createHash("sha256").update(response.rawPayload).digest("hex");
    digests[route.artifactKey] = `${response.rawPayload.byteLength}:${hash}`;
  }
  return digests;
}

describe("promotion Markdown oracle", () => {
  afterEach(() => vi.useRealTimers());

  it("freezes all 28 renderers in empty and blocked states", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-07-21T10:00:00.000Z"));
    const config = loadConfig({ LOG_LEVEL: "silent" });
    const deps = createRuntimeDeps(config);
    deps.opsPromotionDecisions = new OpsPromotionDecisionLedger(
      100,
      () => "11111111-1111-4111-8111-111111111111",
    );
    const app = await buildApp(config, deps);

    try {
      expect(await collectDigests(app)).toEqual(emptyDigests);
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: { reviewer: "oracle-reviewer", note: "freeze renderer parity" },
      });
      expect(decision.statusCode).toBe(201);
      expect(decision.json().id).toBe("11111111-1111-4111-8111-111111111111");
      expect(await collectDigests(app)).toEqual(blockedDigests);
    } finally {
      await app.close();
    }
  });
});
