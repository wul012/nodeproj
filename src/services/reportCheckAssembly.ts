// Aggregate readiness belongs here; domain predicates stay in each lifecycle module.
// Completion is pure, preserves public key order, and accepts only strict true values.
// Missing readiness keys and empty evidence sets fail closed.
export function completeChecks<
  Checks extends { [Key in keyof Checks]: boolean },
  ReadyKey extends Extract<keyof Checks, string>,
>(draft: Checks, readyKey: ReadyKey): { checks: Checks; ready: boolean } {
  const entries = Object.entries(draft);
  const hasReadyKey = entries.some(([key]) => key === readyKey);
  const evidence = entries.filter(([key]) => key !== readyKey);
  const ready = hasReadyKey && evidence.length > 0 && evidence.every(([, value]) => value === true);

  return {
    checks: { ...draft, [readyKey]: ready } as Checks,
    ready,
  };
}
