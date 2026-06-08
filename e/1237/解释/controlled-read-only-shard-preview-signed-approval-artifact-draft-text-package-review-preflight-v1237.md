# Node v1237 signed approval artifact draft text package review preflight

## What changed

Node v1237 contributes to the v1237-v1261 review preflight by covering the request manifest slice. It turns the corresponding v1236 text package intake field into an offline review criterion and pairs it with a rejection control for unreviewable package material.

## Behavioral boundary

This version remains read-only. It prepares review questions and control text, but it does not accept signed draft text, detached signature payloads, approval grants, runtime payloads, operator values, Java writes, or mini-kv writes.

## Source binding

The review preflight consumes Node v1236 text package intake fields and guards. A criterion is ready only when its source field and source guard are ready, read-only, unaccepted, and still blocking draft text package acceptance.

## Slice responsibility

The identity slice binds the request manifest and operator intent to the v1236 expected field without accepting any submitted package text.

## Parallel project status

Java and mini-kv can continue in parallel. Node does not require fresh upstream evidence for this version and does not start sibling services.

## Verification notes

Expected state is ready-for-signed-approval-artifact-draft-text-package-review-preflight with 25 review criteria, 25 review controls, zero reviewed packages, zero approved packages, zero rejected packages, and runtime execution disabled.