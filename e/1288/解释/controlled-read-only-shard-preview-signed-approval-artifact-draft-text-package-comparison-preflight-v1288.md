# Node v1288 signed approval artifact draft text package comparison preflight

## What changed

Node v1288 contributes to the v1287-v1311 comparison preflight by covering the identity slice: operator identity. It turns the corresponding v1286 submission slot into an offline comparison lane and pairs it with an acceptance control for uncompared or unacceptable package material.

## Behavioral boundary

This version remains read-only. It prepares comparison and acceptance metadata, but it does not accept signed draft text, detached signature payloads, approval grants, runtime payloads, operator values, Java writes, or mini-kv writes.

## Source binding

The comparison preflight consumes Node v1286 submission slots and comparison controls. A lane is ready only when the source submission slot and source comparison control are ready, read-only, and still blocking real draft text package acceptance.

## Slice responsibility

The identity slice binds operator identity evidence to a comparison lane while keeping approval capture and execution disabled.

## Parallel project status

Java and mini-kv can continue in parallel. Node does not require fresh upstream evidence for this version and does not start sibling services.

## Verification notes

Expected state is ready-for-signed-approval-artifact-draft-text-package-comparison-preflight with 25 comparison lanes, 25 acceptance controls, zero submitted packages, zero compared packages, zero accepted packages, zero rejected packages, zero signed draft texts, and runtime execution disabled.