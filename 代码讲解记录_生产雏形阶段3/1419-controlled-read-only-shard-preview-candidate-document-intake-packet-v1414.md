# v1414 code walkthrough

The field-completeness slot carries comparison result and identity digest checkpoint fields into the intake packet. The aggregate deduplicates slot fields before comparing them with the source field count.

Tests assert the packet still carries twenty candidate fields.
