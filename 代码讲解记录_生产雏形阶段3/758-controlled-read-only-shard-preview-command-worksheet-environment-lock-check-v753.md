# Node v753 code walkthrough: command worksheet environment lock check

v753 adds the environment lock check.

Key code:

- `WORKSHEET_ENVIRONMENT_LOCK_CHECK` records the required read-only environment.
- The worksheet keeps `readyForLiveExecution=false` and `executionAllowed=false`.

This makes the future manual window explicit about probes enabled and actions disabled.

Verification: covered by the command worksheet focused test.
