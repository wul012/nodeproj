# v1447 code walkthrough

v1447 introduces the material submission precheck type and catalog foundation. The first checkpoint is `CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_PRECHECK_MATERIAL_SOURCE_PACKAGE`, which covers source precheck, reviewed document envelope, and field-completeness request material from v1446.

The builder maps source request items and checks into a read-only checkpoint. The artifact layer keeps submitted, imported, evaluated, accepted, and rejected material counts at zero, so the new surface cannot be mistaken for actual material intake.
