# Node v498 code walkthrough: consumer readiness batch closeout archive

## Version Progress

v498 is the archive step for the v496-v500 chain. v496 created a closeout profile, v497 exposed it as JSON/Markdown, and v498 freezes the route output.

## Archive Flow

The archive was generated through Fastify inject:

- build the app with upstream probes and actions disabled;
- call the batch closeout JSON route;
- call the Markdown variant;
- write both outputs into `e/498/evidence`;
- compute SHA-256 for both outputs;
- write an archive summary.

## What The Archive Summary Records

The summary records status codes, readiness, check counts, active/source versions, closed version count, route count at closeout, file sizes, SHA-256 values, and runtime boundary flags.

## Boundary Decisions

v498 does not reread Java or mini-kv evidence. It archives the Node route output produced by v497. That keeps the next verifier focused on immutable local files.

## What v499 Can Safely Do

v499 can add an archive verifier for these v498 files. It should recompute SHA-256, verify 15/15 checks, and keep sibling services stopped.
