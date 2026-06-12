# Node v2099 roadmap: f-folder explanation quality type contract

## Goal

Define the machine-readable contract for Chinese f-folder explanations so short archive notes cannot pass as code explanation.

## Necessity Proof

- Blocker resolved: v2094-v2098 explanations were useful but too short for maintenance handoff.
- Later consumer: v2100-v2103 can scan, evaluate, route, and archive the same contract.
- Reuse decision: place this next to the existing code walkthrough quality gate instead of adding another production shard execution preflight.
- Growth stop condition: stop adding prose-only rules once length, Chinese depth, code-path density, verification, and safety boundary are enforceable.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. This version only governs Node explanation quality and does not block their owner-receipt work.

## Engineering Requirements

- Record the f root, `解释` directory, optional `图片` directory, enforcement floor, minimum bytes, minimum Chinese characters, and minimum code path references.
- Keep the quality gate read-only.
- Do not claim real production approval or artifact authority.

## Verification

Run focused f-folder rule tests and archive evidence under `e/2099/evidence`; write the Chinese explanation under `f/2099/解释`.
