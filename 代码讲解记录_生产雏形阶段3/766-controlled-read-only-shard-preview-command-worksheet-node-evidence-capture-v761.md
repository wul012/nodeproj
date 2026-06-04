# Node v761 code walkthrough: command worksheet Node evidence capture

v761 adds the Node evidence capture slot.

Key code:

- `WORKSHEET_EVIDENCE_CAPTURE_NODE` maps to `REHEARSAL_EVIDENCE_SLOT_DRY_RUN`.
- `evidenceSlotCount` is derived from unique worksheet evidence slots.

This prepares evidence structure without collecting live evidence.

Verification: covered by the command worksheet focused test.
