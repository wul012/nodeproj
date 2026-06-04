# Node v744 code walkthrough: rehearsal alignment verification

v744 adds runbook alignment verification.

Key code:

- `runbookSectionCodes` is built from the source runbook package.
- `eachStepMapsRunbookSection` checks every rehearsal step source mapping.

The rehearsal packet cannot invent a new checklist branch without a source runbook section.

Verification: covered by the rehearsal packet focused test.
