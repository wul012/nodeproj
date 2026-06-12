# Code walkthrough documentation standard

This standard applies to files under `代码讲解记录*/`.

## Rule

A version may omit a code walkthrough. If a walkthrough exists, it must be a real walkthrough rather than a placeholder.

Use `代码讲解记录/107-production-readiness-summary-v3-v103.md` as the model. A compliant walkthrough should explain the actual code path, the runtime boundary, the evidence consumed, and the verification used to close the version.

## Required Shape

- H1 title with the version and concrete feature or refactor name.
- Goal and non-goal section that states what changed and what did not become executable.
- Entry points or public exports, including route paths when the version adds or preserves a route.
- Response model, data model, or public profile shape when the version changes or preserves a report contract.
- Upstream evidence or configuration section when Java, mini-kv, historical fixtures, or environment flags are involved.
- Service flow section with real file paths and representative code snippets.
- Safety boundary section that names blocked production actions, write paths, credential reads, network calls, and approval gates.
- Test coverage section with focused, downstream, build, smoke, or CI verification.
- One-sentence summary that records the version's engineering meaning.

## F-Folder Chinese Explanation Floor

Files under `f/<version>/解释/` are human-facing explanations, not placeholders. Starting with Node v2094, every explanation that exists must be substantive Chinese writing:

- At least 3600 bytes.
- At least 900 Chinese characters.
- At least four real code, test, docs, archive, or walkthrough paths.
- Must explain goal or context, code entry points, response model, service flow, safety boundary, verification, and next step or stop condition.
- Must not claim production authority, production operations, credential access, live upstream writes, or sibling service startup unless the verified code actually does it.

Do not create `f/<version>/图片/` unless actual image or screenshot evidence exists. An empty image directory is a quality failure.

## What Not To Write

- Do not create one-line or five-line placeholder walkthroughs only to satisfy a version count.
- Do not duplicate the explanation archive when there is no code path worth walking through.
- Do not claim production readiness, execution approval, credential access, live upstream writes, or cross-project startup unless the verified code actually does it.
- Do not add a walkthrough for every tiny archive or closeout step. Batch walkthroughs are preferred when several versions are one coherent refactor.

## Organization

Large walkthrough directories should be bucketed by leading record number. For example, `代码讲解记录_生产雏形阶段3/r2000/` contains records whose filenames start with `2000` or later.
