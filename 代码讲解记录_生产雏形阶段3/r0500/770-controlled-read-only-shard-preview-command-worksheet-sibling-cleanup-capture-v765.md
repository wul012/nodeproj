# Node v765 code walkthrough: command worksheet sibling cleanup capture

v765 adds sibling cleanup capture.

Key code:

- `WORKSHEET_CLEANUP_CAPTURE_SIBLING` has `cleanupSlot=sibling-process-cleanup-slot`.
- The owner is `crossProject`, preserving that Node is not the Java or mini-kv lifecycle owner.

Verification: covered by the command worksheet focused test.
