# Code walkthrough v1324

The offline comparison result slot binds future evidence to the source precheck and digest acceptance checkpoint. This gives later code a narrow place to verify comparison results without expanding the v1321 acceptance precheck object.

The validator also checks that real compared package evidence is still absent, so this version cannot be mistaken for an accepted comparison result.
