# Security and threat model

## Classification

`orderops-node` is a local evidence and control-plane rehearsal. It is not a
production execution service, credential broker, deployment agent, or source of
order truth. The canonical runtime boundary remains
`docs/PRODUCTION_BOUNDARIES.md`.

## Protected assets

- Operator identity, approval decisions, request IDs, and audit evidence.
- Java order-platform and mini-kv endpoint identities.
- Future managed-audit and IdP configuration handles.
- Fixture, report, archive, and release-evidence digests.
- The default-off controls that prevent upstream writes and automatic startup.

## Trust boundaries

1. Browser and HTTP request headers are untrusted input. Local rehearsal headers
   are evidence only unless access-guard enforcement is explicitly enabled.
2. Node-to-Java HTTP and Node-to-mini-kv TCP clients are upstream boundaries.
   Their URLs, timeouts, methods, and commands are constrained in `src/clients`.
3. Files under `fixtures/historical/sibling-workspaces` are frozen evidence, not
   live upstream state and not authorization.
4. Environment variables cross the operator-to-process boundary. Secret values
   must come from an approved external provider and must never be committed,
   rendered, archived, or logged.
5. The in-memory and file audit stores are rehearsal implementations. The
   `managed-unimplemented` kind is a fail-closed marker, not a database adapter.

## Threats and controls

| Threat | Current control | Residual boundary |
| --- | --- | --- |
| Accidental upstream mutation | `UPSTREAM_ACTIONS_ENABLED=false` by default; CI also pins false | no real write window is authorized |
| Automatic sibling startup | Node has no Java/mini-kv process launcher in normal runtime | operators start siblings separately |
| Header impersonation | access guard defaults observe-only and docs label headers untrusted | real IdP/JWKS trust is not connected |
| Credential disclosure | secret defaults are empty; security scan rejects common key/token fingerprints | approved provider integration remains future work |
| Unbounded upstream wait | Java and mini-kv clients use explicit positive timeouts | retry policy remains intentionally absent |
| Evidence tampering | stable SHA-256 digests, frozen fixtures, parity tests, and archive verification | digests prove consistency, not production authorization |
| Archive exhaustion | archive-retention census enforces aggregate, per-version, per-file, and file-count budgets | budget changes require reviewed evidence |
| Unsafe production template | `.env.production.example` keeps probes/actions false, enforcement true, secrets empty, managed audit unimplemented | template is intentionally non-runnable until owners supply approved integrations |

## Secrets policy

- Never commit private-key blocks, cloud access keys, GitHub/Slack/OpenAI tokens,
  non-empty secret assignments in tracked `.env*` files, or credential-bearing
  connection URLs.
- `ORDEROPS_AUTH_TOKEN_SECRET` must remain empty in committed templates.
- Synthetic test values are not production credentials and must not be copied
  into runtime configuration.
- Logs, Markdown, screenshots, fixtures, and evidence JSON may contain handles
  or digests, never raw credential values.
- `npm run security:scan` is the repository gate. It scans this repository only;
  sibling repositories remain independently owned.
- Synthetic credential-bearing URL samples are pinned by path, signal type,
  match digest, and exact count in `docs/security-scan-waivers.json`. A new,
  changed, or stale sample fails the scan; the manifest never permits a raw
  production credential.

## Fail-closed production template

`.env.production.example` is a boundary checklist rather than deployable
configuration. It requires access enforcement, disables all upstream activity,
leaves every secret and external URL empty, and selects
`AUDIT_STORE_KIND=managed-unimplemented`. A reviewed implementation plan must
replace those blockers before any production-like window is considered.

## Vulnerability handling

Stop the affected runtime, preserve the request ID and non-secret evidence,
revoke any exposed external credential through its owner, and open a reviewed
repair version. Do not paste raw secrets into issues, plans, test fixtures,
screenshots, or chat transcripts. Security fixes must keep production actions
disabled until their focused tests and Node Evidence run are green.
