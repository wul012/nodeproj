# Node v1285 signed approval artifact draft text package submission preflight

## What changed

Node v1285 contributes to the v1262-v1286 submission preflight by covering the execution lock slice: no sibling mutation. It turns the corresponding v1261 review criterion into a manual submission slot and pairs it with a comparison control for unsubmitted or uncomparable package material.

## Behavioral boundary

This version remains read-only. It prepares submission and comparison metadata, but it does not accept signed draft text, detached signature payloads, approval grants, runtime payloads, operator values, Java writes, or mini-kv writes.

## Source binding

The submission preflight consumes Node v1261 review criteria and controls. A slot is ready only when the source review criterion and source review control are ready, read-only, and still blocking real draft text package acceptance.

## Slice responsibility

The execution lock slice records mutatesSiblingState=false for Java and mini-kv while leaving those projects free to continue in parallel.

## Parallel project status

Java and mini-kv can continue in parallel. Node does not require fresh upstream evidence for this version and does not start sibling services.

## Verification notes

Expected state is ready-for-signed-approval-artifact-draft-text-package-submission-preflight with 25 submission slots, 25 comparison controls, zero submitted packages, zero compared packages, zero accepted packages, zero rejected packages, zero signed draft texts, and runtime execution disabled.