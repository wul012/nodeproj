package com.codexdemo.orderplatform;

class OpsShardReadinessOperatorEvidenceValueDraftAssuranceIntegrationTests {

    void operatorEvidenceValueDraftCloseoutReturnsLockedTwentyFiveSlotPackage() throws Exception {
        mockMvc.perform(get("/api/v1/ops/shard-readiness/operator-evidence-value-draft-closeout"))
                .andExpect(jsonPath("$.readyForOperatorEvidenceValueDraft").value(true))
                .andExpect(jsonPath("$.actualValueState").value("not-supplied"))
                .andExpect(jsonPath("$.readyForEvidenceImport").value(false))
                .andExpect(jsonPath("$.readyForManualEvidenceEntry").value(false))
                .andExpect(jsonPath("$.readyForLiveExecution").value(false))
                .andExpect(jsonPath("$.readyForProductionExecution").value(false))
                .andExpect(jsonPath("$.checks[9]").value("value-draft-closeout-versions-v609-v633"))
                .andExpect(jsonPath("$.checks[10]").value("value-draft-closeout-slot-count-25"))
                .andExpect(jsonPath("$.checks[12]").value("value-draft-closeout-import-remains-locked"));
    }
}
