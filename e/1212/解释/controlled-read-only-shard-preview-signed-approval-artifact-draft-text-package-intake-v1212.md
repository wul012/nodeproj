# Node v1212 signed approval artifact draft text package intake

## What changed

Node v1212 contributes to the v1212-v1236 text package intake profile by covering identity, requester, signer, and correlation intake fields digest binding and source digest recheck fields detached signature envelope metadata fields source evidence and archive reference fields operator value handle binding fields without value import policy, review state, and rejection-code fields execution lock, runtime, write, import, and sibling mutation guards.

## Behavioral boundary

This version remains read-only. It defines expected manual draft text package fields and guard behavior, but it does not accept signed draft text, detached signature payloads, approval grants, runtime payloads, operator values, Java writes, or mini-kv writes.

## Source binding

The intake consumes Node v1211 instruction preflight slots and guards. A field is ready only when its source instruction slot and source instruction guard are ready, read-only, unmaterialized, and still blocking draft text/package acceptance.

## Parallel project status

Java and mini-kv can continue in parallel. Node does not require fresh upstream evidence for this version and does not start sibling services.

## Verification notes

Expected state is ready-for-signed-approval-artifact-draft-text-package-intake with 25 intake fields, 25 intake guards, zero actual draft text fields, zero accepted packages, and runtime execution disabled.