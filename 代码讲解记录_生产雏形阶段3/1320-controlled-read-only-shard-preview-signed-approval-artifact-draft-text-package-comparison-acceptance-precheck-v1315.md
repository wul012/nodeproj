# 1320. Node v1315 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1315 adds detached signature envelope acceptance precheck support. It maps the three signature-envelope lanes and controls into one checkpoint.

The guard keeps signature payload ingestion blocked. This matters because a detached signature envelope can be described and later compared, but the precheck cannot parse, import, or trust a signature payload.

The renderer exposes the checkpoint and guard in Markdown so route/profile evidence can show that signature acceptance is still blocked until a later explicit review.
