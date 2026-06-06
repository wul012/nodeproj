#include "minikv/shard_route_preview_operator_value_draft.hpp"

namespace minikv::shard_route_preview_operator_value_draft {

std::string format_value_draft_json() {
    return "{\"contract\":\"shard-route-preview-operator-value-draft.v1\""
           ",\"command\":\"SHARDROUTEVALUEDRAFTJSON\""
           ",\"sourceNodePlan\":\"docs/plans3/v911-controlled-read-only-shard-preview-operator-evidence-value-draft-closeout-roadmap.md\""
           ",\"valueDraftStage\":\"route-preview-value-draft-release-package\""
           ",\"valueDraftReleaseVersion\":\"v585\""
           ",\"operatorValueDraftSlotCount\":25"
           ",\"acceptedOperatorValueCount\":0"
           ",\"importedEvidenceValueCount\":0"
           ",\"actualValueState\":\"not-supplied\""
           ",\"readyForOperatorEvidenceValueDraft\":true"
           ",\"readyForEvidenceImport\":false"
           ",\"readyForManualEvidenceEntry\":false"
           ",\"readyForLiveExecution\":false"
           ",\"readyForProductionExecution\":false"
           ",\"valueSupplyAdapterEnabled\":false"
           ",\"walTouched\":false"
           ",\"writeRoutingEnabled\":false}";
}

} // namespace minikv::shard_route_preview_operator_value_draft
