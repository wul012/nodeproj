import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion handoff completion routes", () => {
  it("builds a promotion handoff completion as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyCompletion = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "completion-reviewer",
          note: "build handoff completion",
        },
      });
      const completion = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion?format=markdown",
      });

      expect(emptyCompletion.statusCode).toBe(200);
      expect(emptyCompletion.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          closureVerified: true,
          closureDigestValid: true,
          closureItemsValid: true,
          referenceChecksValid: true,
          closeoutReady: false,
          closureItemCount: 7,
          completionStepCount: 5,
        },
      });
      expect(emptyCompletion.json().completionName).toMatch(/^promotion-completion-[a-f0-9]{12}$/);
      expect(emptyCompletion.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyCompletion.json().completionDigest.coveredFields).toEqual([
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "completionSteps",
        "nextActions",
      ]);
      expect(emptyCompletion.json().closureDigest.value).toBe(emptyCompletion.json().verifiedClosureDigest.value);
      expect(emptyCompletion.json().completionSteps.map((step: { name: string }) => step.name)).toEqual([
        "closure-created",
        "closure-verified",
        "closure-items-verified",
        "receipt-chain-verified",
        "handoff-readiness-recorded",
      ]);
      expect(emptyCompletion.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(emptyCompletion.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        ready: false,
      });
      expect(decision.statusCode).toBe(201);
      expect(completion.statusCode).toBe(200);
      expect(completion.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        decision: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          closureVerified: true,
          closureDigestValid: true,
          closureItemsValid: true,
          referenceChecksValid: true,
          closeoutReady: false,
          closureItemCount: 7,
          completionStepCount: 5,
        },
      });
      expect(completion.json().completionName).toMatch(/^promotion-completion-[a-f0-9]{12}$/);
      expect(completion.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(completion.json().closureDigest.value).toBe(completion.json().verifiedClosureDigest.value);
      expect(completion.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(completion.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        ready: false,
      });
      expect(completion.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff completion");
      expect(markdown.body).toContain("- Handoff ready: false");
      expect(markdown.body).toContain(`- Completion digest: sha256:${completion.json().completionDigest.value}`);
      expect(markdown.body).toContain("- Closeout ready: false");
      expect(markdown.body).toContain("## Completion Steps");
      expect(markdown.body).toContain("### handoff-readiness-recorded");
    } finally {
      await app.close();
    }
  });

  it("verifies a promotion handoff completion as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "completion-verifier",
          note: "verify handoff completion",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-completion/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        checks: {
          completionDigestValid: true,
          coveredFieldsMatch: true,
          completionStepsValid: true,
          completionNameMatches: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          closureDigestMatches: true,
          verifiedClosureDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          completionStepCount: 5,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().completionDigest.value).toBe(emptyVerification.json().recomputedCompletionDigest.value);
      expect(emptyVerification.json().completionSteps.map((step: { name: string }) => step.name)).toEqual([
        "closure-created",
        "closure-verified",
        "closure-items-verified",
        "receipt-chain-verified",
        "handoff-readiness-recorded",
      ]);
      expect(emptyVerification.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(emptyVerification.json().completionSteps.every((step: { digestMatches: boolean }) => step.digestMatches)).toBe(true);
      expect(emptyVerification.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        readyMatches: true,
      });
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        checks: {
          completionDigestValid: true,
          coveredFieldsMatch: true,
          completionStepsValid: true,
          completionNameMatches: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          closureDigestMatches: true,
          verifiedClosureDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          completionStepCount: 5,
          handoffReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().completionName).toMatch(/^promotion-completion-[a-f0-9]{12}$/);
      expect(verification.json().completionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().completionDigest.value).toBe(verification.json().recomputedCompletionDigest.value);
      expect(verification.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
      expect(verification.json().completionSteps.every((step: { digestMatches: boolean }) => step.digestMatches)).toBe(true);
      expect(verification.json().completionSteps[4]).toMatchObject({
        name: "handoff-readiness-recorded",
        valid: true,
        readyMatches: true,
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion handoff completion verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Completion digest: sha256:${verification.json().completionDigest.value}`);
      expect(markdown.body).toContain("- Completion digest valid: true");
      expect(markdown.body).toContain("## Completion Steps");
      expect(markdown.body).toContain("### handoff-readiness-recorded");
    } finally {
      await app.close();
    }
  });

});
