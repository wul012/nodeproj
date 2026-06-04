# Node v764 code walkthrough: command worksheet Node cleanup capture

v764 adds the Node cleanup capture slot.

Key code:

- `WORKSHEET_CLEANUP_CAPTURE_NODE` has `cleanupSlot=node-process-cleanup-slot`.
- `cleanupSlotCount` counts non-null cleanup slots.

The worksheet requires cleanup proof later while starting no process now.

Verification: covered by the command worksheet focused test.
