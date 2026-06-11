# v1464 code walkthrough

v1464 replaces five inline section blocks in the main renderer with `...renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections(profile)`.

That single spread preserves section order because the new function returns the same heading sequence and blank separators.
