# v1409 code walkthrough

The disabled-probe-state checkpoint records the smoke behavior learned in v1386. Disabled upstream probes can make the route state blocked even when v1411 fields are present.

HTTP smoke checks state field presence and blocked permissions instead of hard-coding ready state.
