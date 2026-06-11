# v2011 code walkthrough

Java execution-contract readers extract nested fields from `executionContract`.

The verification layer uses these to require `failed-event-replay-execution-contract.v1` and `CLIENT_PRECHECK_ONLY` when live evidence is available.
