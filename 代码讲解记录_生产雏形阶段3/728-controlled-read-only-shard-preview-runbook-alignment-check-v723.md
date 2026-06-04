# Node v723 code walkthrough: runbook alignment check

`RUNBOOK_ALIGNMENT_CHECK` verifies each runbook section maps back to a stage ledger code.

The package fails closed if a section cannot be traced to the stage ledger.
