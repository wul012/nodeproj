# v1418 candidate document intake packet

v1418 adds the redaction-secret-boundary intake slot. It keeps redaction and secret-value absence checks active before reviewed material exists.

The aggregate still reports `containsSecretValue=false` and does not expose raw secret content.
