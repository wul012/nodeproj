# v2032 code walkthrough

`createChecks` owns the readiness boolean map.

The aggregate ready flag is still set by the entrypoint after every non-aggregate check is computed.
