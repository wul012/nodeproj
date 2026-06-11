# Node v1956 - disabled fake harness upstream echo Java evidence

## Focus

Move Java v122-v126 evidence construction into references.

## What changed

`createJavaV122V126Reference` now owns Java runbook and boundary catalog evidence scanning.

## Maintenance note

Java evidence remains read-only and file-backed; this refactor does not request fresh Java work.
