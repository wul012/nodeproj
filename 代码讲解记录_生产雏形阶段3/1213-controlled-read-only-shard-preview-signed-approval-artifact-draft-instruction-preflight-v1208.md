# Code walkthrough 1213 - Node v1208 signed approval artifact draft instruction preflight

## Slice

Node v1208 contributes the zero value import embargo instruction slot. The slot is derived from the authoring readiness catalog, and the guard is derived from the instruction guard catalog so the draft path cannot silently materialize instructions.

## Code path

- The slot catalog maps each v1186 authoring requirement into a v1187-v1211 instruction slot and carries the source requirement and blocker codes.
- The guard catalog derives missing-slot guards that keep draft instructions, signed text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation blocked.
- The builder reads the authoring readiness object and fails closed when source requirements or blockers are not ready.
- The validator rolls source readiness, slot/guard readiness, digest pins, no-materialization, and no-side-effect gates into the v1211 gate set.
- The artifacts module computes the instruction preflight digest and exposes route/profile counts.
- The renderer exposes slots, guards, gates, and blocked reasons in stable Markdown for archive review and HTTP smoke.

## Maintenance note

Keep this slice declarative. If future work accepts real signed draft text, detached signature payloads, or approval grants, it must create a new package instead of extending Node v1208 into an execution surface.
