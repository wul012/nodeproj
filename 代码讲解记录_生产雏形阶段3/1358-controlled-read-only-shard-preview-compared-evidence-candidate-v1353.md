# v1353 code walkthrough

The artifact-shape section groups `artifactShape` with `secretValueExclusion`. This makes the future candidate contract explicit: shape can be described, but credentials, secrets, and raw operator values cannot appear in the candidate payload.

The blocker generated from the same section blocks materialization, acceptance, approval, runtime payloads, writes, and sibling mutation.
