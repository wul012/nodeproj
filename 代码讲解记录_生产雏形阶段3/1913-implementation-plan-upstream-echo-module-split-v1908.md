# Code walkthrough - Node v1908

## Focus

Move the mini-kv v126 non-participation reference builder into References.

## Code reading notes

- mini-kv v126 receipt parsing is now contained in References.
- Non-participation fields stay close to the JSON helper calls.
- The side-effect boundary still reads from the same frozen receipt.

## Maintenance rule

Keep the stable service barrel thin, keep evidence references in References, keep boolean gates and messages in Checks, and keep digest/profile assembly in Core.
