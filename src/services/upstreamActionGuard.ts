import { AppHttpError } from "../errors.js";

export function assertUpstreamActionsEnabled(enabled: boolean, target: string): void {
  if (enabled) {
    return;
  }

  throw new AppHttpError(
    403,
    "UPSTREAM_ACTIONS_DISABLED",
    `${target} access is disabled by UPSTREAM_ACTIONS_ENABLED=false`,
    {
      target,
      enableWith: "UPSTREAM_ACTIONS_ENABLED=true",
    },
  );
}
