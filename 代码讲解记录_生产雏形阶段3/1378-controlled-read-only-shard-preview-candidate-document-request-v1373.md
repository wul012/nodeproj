# v1373 code walkthrough

The catalog adds the artifact-shape request item as a declarative template. The builder resolves source slot and guard codes from the v1371 intake package instead of copying field lists by hand.

This keeps field ownership in the intake layer while making request wording explicit for future real-document intake.
