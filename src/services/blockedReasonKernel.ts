// Abstraction: an ordered pass/failure rule list.
// Validators own rule data; this engine owns filtering and order preservation.
export type BlockedReasonRule = readonly [passes: boolean, failureReason: string];

export function collectBlockedReasons(rules: readonly BlockedReasonRule[]): string[] {
  return rules
    .filter(([passes]) => !passes)
    .map(([, failureReason]) => failureReason);
}
