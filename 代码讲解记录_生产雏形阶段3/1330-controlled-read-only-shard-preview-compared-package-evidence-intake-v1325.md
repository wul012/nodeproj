# Code walkthrough v1325

The identity binding slot isolates request, operator, correlation, and artifact identity expectations. The builder counts source checkpoint and guard readiness for this slot, which lets tests verify the identity family without touching digest or policy code.

The profile renderer surfaces the count and field name through the aggregate Markdown path.
