# v1370 code walkthrough

The approval-separation intake slot keeps document intake separate from approval grant, signed approval capture, runtime payload import, and execution. This is the main correctness boundary for future shard preview work.

The review artifact barrel re-exports the intake creator and renderer. Existing callers can keep using the stable review-artifacts entry point instead of reaching into the new split modules.
