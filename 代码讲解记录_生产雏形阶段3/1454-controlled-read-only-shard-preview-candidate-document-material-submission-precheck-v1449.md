# v1449 code walkthrough

v1449 adds document-origin coverage. The source request item kinds are document source URI and document SHA-256 digest, and the catalog derives the matching acceptance check kinds through the shared `checkKindFor` helper.

This keeps source request coverage and check coverage aligned by construction. A later material submission stage can reuse the same checkpoint codes without guessing which checks protect the source material.
