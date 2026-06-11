# v2030 code walkthrough

`createReadinessGate` now lives in the core module.

It computes the digest from the same inputs as before while keeping the closed execution boundary visible in one object.
