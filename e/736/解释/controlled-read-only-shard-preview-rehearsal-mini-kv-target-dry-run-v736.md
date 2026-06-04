# v736 Controlled read-only shard preview rehearsal mini-kv target dry run

v736 adds the mini-kv read target dry run.

It records `REHEARSAL_MINI_KV_TARGET_DRY_RUN`, mapping to `MINI_KV_TARGET_CHECKLIST`. The step preserves the read command order for operator review and explicitly avoids starting mini-kv from Node.

Cross-project status: mini-kv can continue independently. Node does not require new mini-kv files or live service output here.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
