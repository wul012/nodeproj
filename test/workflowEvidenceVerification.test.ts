import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createWorkflowEvidenceVerification,
  loadWorkflowEvidenceVerification,
} from "../src/services/workflowEvidenceVerification.js";

describe("workflow evidence verification", () => {
  it("validates the checked-in Node evidence workflow as read-only evidence", async () => {
    const verification = await loadWorkflowEvidenceVerification();

    expect(verification).toMatchObject({
      service: "orderops-node",
      verificationVersion: "workflow-evidence-verification.v1",
      valid: true,
      readOnly: true,
      executionAllowed: false,
      checks: {
        workflowFilePresent: true,
        workflowNamePresent: true,
        permissionsReadOnly: true,
        nodeSetupPresent: true,
        npmCiPresent: true,
        typecheckPresent: true,
        testPresent: true,
        buildPresent: true,
        safeSmokeServerPresent: true,
        healthSmokePresent: true,
        releaseEvidenceReadinessSmokePresent: true,
        probesDisabled: true,
        actionsDisabled: true,
        readinessSmokeKeepsExecutionBlocked: true,
        noSecretsReference: true,
        noKubectl: true,
        noDockerPush: true,
        noScp: true,
        noUpstreamActionsEnabledTrue: true,
      },
      summary: {
        requiredCheckCount: 19,
        passingCheckCount: 19,
        failingCheckCount: 0,
        blockerCount: 0,
        warningCount: 1,
      },
    });
    expect(verification.warnings.map((warning) => warning.code)).toEqual(["MANUAL_DISPATCH_PRESENT"]);
    expect(verification.evidenceEndpoints.workflowEvidenceVerificationMarkdown).toContain("format=markdown");
  });

  it("blocks workflow evidence when unsafe commands or secrets are introduced", async () => {
    const workflow = await readFile(
      path.join(process.cwd(), ".github", "workflows", "node-evidence.yml"),
      "utf8",
    );
    const verification = createWorkflowEvidenceVerification(
      path.join(process.cwd(), ".github", "workflows", "node-evidence.yml"),
      `${workflow}\n- run: echo \${{ secrets.PROD_TOKEN }}\n- run: kubectl rollout restart deploy/orderops\n- run: docker push example/orderops:latest\n- run: scp dist/server.js ops@example:/srv/orderops\n- run: echo UPSTREAM_ACTIONS_ENABLED: \"true\"\n`,
    );

    expect(verification.valid).toBe(false);
    expect(verification.checks.noSecretsReference).toBe(false);
    expect(verification.checks.noKubectl).toBe(false);
    expect(verification.checks.noDockerPush).toBe(false);
    expect(verification.checks.noScp).toBe(false);
    expect(verification.checks.noUpstreamActionsEnabledTrue).toBe(false);
    expect(verification.blockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SECRETS_REFERENCE_PRESENT",
      "KUBECTL_PRESENT",
      "DOCKER_PUSH_PRESENT",
      "SCP_PRESENT",
      "UPSTREAM_ACTIONS_TRUE_PRESENT",
    ]));
  });

  it("exposes workflow evidence verification routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/ci/workflow-evidence-verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ci/workflow-evidence-verification?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        readOnly: true,
        executionAllowed: false,
        checks: {
          npmCiPresent: true,
          typecheckPresent: true,
          noSecretsReference: true,
          noUpstreamActionsEnabledTrue: true,
        },
        summary: {
          blockerCount: 0,
          failingCheckCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Workflow evidence verification");
      expect(markdown.body).toContain("- Execution allowed: false");
      expect(markdown.body).toContain("noDockerPush: true");
      expect(markdown.body).toContain("workflowEvidenceVerificationJson");
    } finally {
      await app.close();
    }
  });
});
