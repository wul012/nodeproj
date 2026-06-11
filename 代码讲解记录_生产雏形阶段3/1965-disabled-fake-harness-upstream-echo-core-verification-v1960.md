# Code walkthrough - Node v1960

## Focus

Extract echo verification assembly.

## Code reading notes

- `createEchoVerification` lives in Core.
- It turns references and checks into the final verification record.
- The loader only wires inputs and includes the returned object.

## Maintenance rule

Core owns derived profile records.
