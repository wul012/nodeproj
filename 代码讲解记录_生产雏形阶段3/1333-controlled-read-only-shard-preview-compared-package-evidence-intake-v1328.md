# Code walkthrough v1328

The source evidence handle slot maps both source evidence and operator value checkpoints. It requires future real evidence to cite existing handles, which prevents the intake contract from becoming another runtime importer.

No Java or mini-kv service startup is introduced; sibling projects can continue independently.
