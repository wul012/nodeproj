import type { AppConfig } from "../../config.js";
import { createPlanEchoChecks } from "./checks.js";
import { createJavaV112Echo } from "./javaEcho.js";
import { createMiniKvV119Receipt } from "./miniKvReceipt.js";
import { createPlanEchoProfile } from "./profile.js";
import { createSourceNode } from "./sourceNode.js";
import type { PlanEchoProfile } from "./types.js";

export { renderPlanEchoMarkdown } from "./planEchoRenderer.js";

export function loadPlanEchoVerification(input: { config: AppConfig }): PlanEchoProfile {
  const source = createSourceNode(input.config);
  const java = createJavaV112Echo();
  const miniKv = createMiniKvV119Receipt();
  const checks = createPlanEchoChecks(input.config, source, java, miniKv);

  return createPlanEchoProfile(source, java, miniKv, checks);
}
