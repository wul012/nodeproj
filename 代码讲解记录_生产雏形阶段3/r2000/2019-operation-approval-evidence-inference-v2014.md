# v2014 code walkthrough

Inference helpers locate a failed-event id or mini-kv command from stored preview evidence.

If they cannot find required context, the service keeps returning missing-context evidence instead of probing blindly.
