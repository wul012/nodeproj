package com.codexdemo.orderplatform.ops;

import java.util.List;

public class OpsShardReadinessOperatorEvidenceValueDraftCloseoutService {

    static final String PROFILE =
            "java-shard-readiness-operator-evidence-value-draft-closeout.v1";

    public OpsShardReadinessOperatorEvidenceValueDraftResponse closeout() {
        return OpsShardReadinessOperatorEvidenceValueDraftSupport.response(
                "Java v632",
                "/api/v1/ops/shard-readiness/operator-evidence-value-draft-closeout",
                PROFILE,
                OpsShardReadinessOperatorEvidenceValueDraftSlotCatalog.allSlots(),
                List.of(
                        "value-draft-closeout-versions-v609-v633",
                        "value-draft-closeout-slot-count-25",
                        "value-draft-closeout-foundation-and-assurance-split",
                        "value-draft-closeout-import-remains-locked"
                )
        );
    }
}
