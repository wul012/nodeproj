# v712 Controlled read-only shard preview owner binding checklist

v712 starts the operator runbook package by turning the v692 owner stage into `OWNER_BINDING_CHECKLIST`.

It requires owner ids, ports, PID policy, and cleanup owners before any live read-only window opens. It starts no services and keeps production execution false.

Cross-project status: Java and mini-kv can continue in parallel by preparing matching owner records.

Verification: covered by the runbook package focused test.
