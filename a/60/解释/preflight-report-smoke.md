# Operation preflight report

- Service: orderops-node
- Generated at: 2026-05-11T14:28:33.414Z
- State: review-required
- Intent id: e4dbbd57-31f6-45f2-9173-55800054bf68
- Action: kv-status
- Target: mini-kv
- Risk: diagnostic
- Preflight digest: sha256:6d19f4560e04d7161b45d642ccf1d598ea40eb7be7bbf2349ea57de7cd628853
- Ready for dry-run dispatch: true

## Policy And Confirmation

- Intent status: confirmed
- Operator: v60-smoke-viewer (viewer)
- Policy allowed: true
- Required role: viewer
- Actual role: viewer
- Confirmed: true
- Required text: CONFIRM kv-status

## Safety Flags

- UPSTREAM_PROBES_ENABLED: false
- UPSTREAM_ACTIONS_ENABLED: true
- Mutation rate limit: 30/60000ms

## Dispatch History

- Total: 1
- Dry-run completed: 1
- Rejected: 0
- Upstream touched: 0

## Evidence

### Java replay readiness

- Status: not_applicable
- Message: Intent action does not target Java failed-event replay readiness.

### mini-kv command catalog

- Status: skipped
- Message: UPSTREAM_PROBES_ENABLED=false; mini-kv command catalog was not requested.

### mini-kv key inventory

- Status: skipped
- Message: UPSTREAM_PROBES_ENABLED=false; mini-kv key inventory was not requested.

## Hard Blockers

- No hard blockers.

## Warnings

- UPSTREAM_PROBES_SKIPPED

## Next Actions

- Review warnings before dispatch: UPSTREAM_PROBES_SKIPPED
- Create or inspect a dry-run dispatch, then archive the preflight evidence.
