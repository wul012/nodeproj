# Code walkthrough v1322

The compared package evidence intake starts from the v1321 acceptance precheck. The source precheck slot covers all ten acceptance checkpoints and all ten guards, so later real evidence must cite the full precheck contract rather than cherry-picking one ready lane.

The implementation lives in the split `ComparedPackageEvidenceIntake*` modules. `Types` defines the contract, `Catalog` declares the slot, `Builder` maps source readiness, `Validator` keeps the guard rails, `Artifacts` assembles the digest, and `Renderer` gives a stable Markdown surface.
