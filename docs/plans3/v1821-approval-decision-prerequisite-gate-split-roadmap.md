# v1792-v1821 approval decision prerequisite gate split roadmap

## Scope

This batch splits the oversized approval-decision prerequisite gate into a stable barrel, shared types, data constants, support builders, core loading logic, and Markdown renderers while preserving the public import path.

## Necessity proof

- Blocker resolved: approvalDecisionPrerequisiteGate.ts currently mixes type definitions, Java and mini-kv fixture constants, prerequisite builders, blocker/warning/recommendation builders, load logic, checks, digesting, and Markdown rendering in one file.
- Later consumer: approval-ledger dry-run envelope, status routes, and the gate's own tests all depend on the public barrel, so the export surface must stay stable while the implementation moves.
- Existing reports/routes cannot be reused because this is a maintainability and ownership problem inside an already-covered approval prerequisite gate, not a missing evidence problem.
- Stop condition: after the barrel, types, data, support, core, and renderer layers are separated, keep new gate logic in the matching module and keep the old path as a thin barrel only.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this maintainability split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this maintainability split and does not block mini-kv work.
- Service startup: no sibling service startup is required. Node tests use in-process app injection; no Java or mini-kv process is needed.
- Ownership: Node owns v1792-v1821. Java and mini-kv can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1792 | Define the split boundary and stable barrel. |
| v1793 | Extract shared gate types into a dedicated module. |
| v1794 | Extract Java and mini-kv fixture constants plus endpoints. |
| v1795 | Move prerequisite signal, blocker, and step builders into support. |
| v1796 | Move forbidden-operation and pause-condition builders into support. |
| v1797 | Move production blocker, warning, and recommendation builders into support. |
| v1798 | Extract the core loader and digest logic. |
| v1799 | Extract Markdown renderers and section helpers. |
| v1800 | Preserve the barrel export surface and import path. |
| v1801 | Add split-export identity regression coverage. |
| v1802 | Run focused split tests. |
| v1803 | Run the approval decision prerequisite gate behavior tests. |
| v1804 | Run the approval ledger dry-run envelope tests. |
| v1805 | Run the production release pre-approval packet tests. |
| v1806 | Run typecheck across the split. |
| v1807 | Run build after the split. |
| v1808 | Run segmented Vitest after the split. |
| v1809 | Verify Java can continue in parallel. |
| v1810 | Verify mini-kv can continue in parallel. |
| v1811 | Archive the explanation and walkthrough artifacts. |
| v1812 | Clean generated validation outputs. |
| v1813 | Commit the batch. |
| v1814 | Add version tags v1792-v1821. |
| v1815 | Push master and the new tags. |
| v1816 | Poll GitHub Actions. |
| v1817 | Confirm CI success. |
| v1818 | Confirm the workspace is clean. |
| v1819 | Record the stable public API rule. |
| v1820 | Record the no fresh sibling evidence rule. |
| v1821 | Close the batch. |

## Verification plan

- npm run typecheck
- focused split-export test
- approval decision prerequisite gate behavior test
- approval ledger dry-run envelope test
- production release pre-approval packet test
- npm run build
- segmented Vitest verification
- GitHub Actions after push
