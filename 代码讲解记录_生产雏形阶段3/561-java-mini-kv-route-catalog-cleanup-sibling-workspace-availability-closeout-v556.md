# Node v556 code walkthrough: sibling workspace availability closeout

## Why This Version Exists

The desktop workspace currently has `orderops-node` but not separate live Java or mini-kv repositories. Earlier live-smoke work can use real sibling services only when those repositories are actually present. Otherwise Node should rely on committed historical fixtures.

v556 makes that boundary explicit in code.

## Service

`javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.ts` loads the v554 chain closeout and checks committed historical fixture roots:

- Java fixture root under `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform`;
- mini-kv fixture root under `fixtures/historical/sibling-workspaces/mini-kv`.

It records that live sibling startup is not required by default, Java and mini-kv are recommended parallel, and Node is not waiting for fresh sibling evidence.

## Renderer

`javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutRenderer.ts` renders sibling workspace mode, fixture roots, upstream boundary, source closeout, checks, summary, and next actions.

## Test

`javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.test.ts` verifies the fixture roots are present, source chain closeout is ready, no runtime authority is opened, and Markdown records that live sibling startup is not the default.

## Boundary

v556 does not start Java, does not start mini-kv, and does not require local sibling paths outside this repository. It documents when live sibling startup is appropriate.
