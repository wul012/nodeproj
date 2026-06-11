# v1385 code walkthrough

The import and evaluation freeze request item keeps payload import, evaluation, acceptance, and rejection at zero. The artifact gates expose these as `requestPayloadImportStillBlocked`, `requestEvaluationStillBlocked`, and `requestAcceptanceStillBlocked`.

HTTP smoke in disabled-probe mode checks for route presence, version, counts, state field presence, and blocked permissions rather than hard-coding ready state.
