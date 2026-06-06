namespace minikv::shard_route_preview_operator_value_supply_envelope {

const char* value_supply_envelope_fixture() {
    return "{\"contract\":\"shard-route-preview-operator-value-supply-envelope.v1\""
           ",\"command\":\"SHARDROUTEVALUESUPPLYJSON\""
           ",\"valueSupplyReleaseRangeStart\":\"v586\""
           ",\"valueSupplyReleaseRangeEnd\":\"v610\""
           ",\"operatorValueEnvelopeSlotCount\":25"
           ",\"acceptedOperatorValueCount\":0"
           ",\"importedEvidenceValueCount\":0"
           ",\"operatorValueEnvelopeState\":\"disabled-by-default\""
           ",\"readyForOperatorValueSupply\":false"
           ",\"valueSupplyAdapterEnabled\":false"
           ",\"operatorValuesPersisted\":false}";
}

} // namespace minikv::shard_route_preview_operator_value_supply_envelope
