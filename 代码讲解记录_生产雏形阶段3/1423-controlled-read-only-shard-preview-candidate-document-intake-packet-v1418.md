# v1418 code walkthrough

The redaction-secret-boundary slot keeps redaction and secret-value absence in the intake packet. The aggregate exposes `acceptsSyntheticEvidence=false` and `containsSecretValue=false`.

The route profile shows these fields without rendering any secret value.
