# v1983 code walkthrough

`managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.ts` remains the public module, but it no longer owns every concern.

The entrypoint now loads the source reports, creates the three evidence references, asks policy for checks and messages, and delegates final profile assembly to core.
