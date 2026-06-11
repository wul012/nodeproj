# v2010 code walkthrough

Java approval-status readers extract nested evidence fields from `approvalStatus`.

They keep optional fields optional so skipped, unavailable, and not-applicable evidence still verifies correctly.
