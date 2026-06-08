# v1384 code walkthrough

The unreviewed-document quarantine request item requires reviewed material before any import or evaluation can happen. The checks keep quarantine, missing rejection, and synthetic rejection as distinct assertions.

The route test now asserts the v1386 request package section, version, item count, check count, requested field count, and blocked permissions.
