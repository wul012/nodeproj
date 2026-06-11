# Code walkthrough - Node v1973

## Focus

Extract mini-kv v99 reference projection.

## Code reading notes

- `createMiniKvV99Reference` reads runtime smoke and verification manifest JSON.
- Private JSON helper functions stay in References.
- Accepted v99/v100/v101/v102 evidence variants are checked through Constants.

## Maintenance rule

Keep mini-kv parsing in References and policy decisions in Policy.
