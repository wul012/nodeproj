package com.codexdemo.orderplatform;

final class OpsShardReadinessOperatorEvidenceImportPreflightAssuranceIntegrationTests {
    void operatorEvidenceImportPreflightCloseoutReturnsBatchCloseout() {
        mockMvc.perform(get("/api/v1/ops/shard-readiness/operator-evidence-import-preflight-closeout"))
                .andExpect(jsonPath("$.readyForOperatorEvidenceImportPreflight").value(true))
                .andExpect(jsonPath("$.readyForEvidenceImport").value(false))
                .andExpect(jsonPath("$.status").value("passed"));
    }
}
