# Node v572 code walkthrough: consumer readiness batch closeout file support coverage

## New Support Test

`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.test.ts` directly exercises the helper module from v571.

## Covered Behavior

The test covers:

- SHA-256 file references for present files;
- missing file references;
- text reads;
- JSON reads and invalid JSON fallback;
- nested `valueAt(...)`;
- `objectField`, `stringValue`, and `numberValue`.

## Cleanup

The test creates temporary directories under the OS temp path and removes them in `finally` blocks.

## Boundary

v572 is test-only support coverage. It changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
