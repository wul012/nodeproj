# Node v734 code walkthrough: rehearsal Node target dry run

v734 adds the Node target dry run.

Key code:

- `REHEARSAL_NODE_TARGET_DRY_RUN` maps to `NODE_TARGET_CHECKLIST`.
- The step is owned by `node` and remains `readOnly=true`, `writesAllowed=false`, `startsServices=false`.

The intent is to review Node target order without creating a server process or a live evidence record.

Verification: covered by the rehearsal packet focused test.
