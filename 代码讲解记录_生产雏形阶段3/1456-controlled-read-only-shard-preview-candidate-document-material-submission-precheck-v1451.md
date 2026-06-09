# v1451 code walkthrough

v1451 adds field-table coverage and exposes the required material field count in the package summary. The profile renderer prints both required fields and submission material fields, keeping the route report easy to audit.

The route tests assert twenty submission fields and blocked submission/intake flags, so the profile cannot silently drift into an intake surface.
