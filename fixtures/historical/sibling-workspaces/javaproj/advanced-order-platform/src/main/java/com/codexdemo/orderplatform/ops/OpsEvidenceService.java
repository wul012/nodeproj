package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.notification.FailedEventSummaryResponse;
import com.codexdemo.orderplatform.notification.FailedEventSummaryService;
import com.codexdemo.orderplatform.order.IdempotencyStore;
import com.codexdemo.orderplatform.order.IdempotencyStoreDescriptor;
import com.codexdemo.orderplatform.order.JpaIdempotencyStore;
import com.codexdemo.orderplatform.outbox.OutboxPublisherProperties;
import com.codexdemo.orderplatform.outbox.OutboxRabbitMqProperties;
import com.codexdemo.orderplatform.outbox.OutboxRepository;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OpsEvidenceService {

    static final String EVIDENCE_VERSION = "java-ops-evidence.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_VERSION = "java-release-approval-rehearsal.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_ENDPOINT = "/api/v1/ops/release-approval-rehearsal";

    static final String RELEASE_APPROVAL_REHEARSAL_CONTEXT_VERSION =
            "java-release-approval-rehearsal-context.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_OPERATOR_WINDOW_HINT_VERSION =
            "java-release-approval-rehearsal-operator-window-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_CI_EVIDENCE_HINT_VERSION =
            "java-release-approval-rehearsal-ci-evidence-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_ARTIFACT_RETENTION_HINT_VERSION =
            "java-release-approval-rehearsal-artifact-retention-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_LIVE_READINESS_HINT_VERSION =
            "java-release-approval-rehearsal-live-readiness-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_AUDIT_PERSISTENCE_HANDOFF_HINT_VERSION =
            "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_APPROVAL_RECORD_HANDOFF_HINT_VERSION =
            "java-release-approval-rehearsal-approval-record-handoff-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_APPROVAL_HANDOFF_VERIFICATION_MARKER_VERSION =
            "java-release-approval-rehearsal-approval-handoff-verification-marker.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_ADAPTER_BOUNDARY_RECEIPT_VERSION =
            "java-release-approval-rehearsal-managed-audit-adapter-boundary-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_PRODUCTION_ADAPTER_PREREQUISITE_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-production-adapter-prerequisite-receipt.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_OPS_EVIDENCE_SERVICE_QUALITY_SPLIT_RECEIPT_VERSION =
            "java-release-approval-rehearsal-ops-evidence-service-quality-split-receipt.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_ADAPTER_IMPLEMENTATION_GUARD_RECEIPT_VERSION =
            "java-release-approval-rehearsal-managed-audit-adapter-implementation-guard-receipt.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_EXTERNAL_ADAPTER_MIGRATION_GUARD_RECEIPT_VERSION =
            "java-release-approval-rehearsal-managed-audit-external-adapter-migration-guard-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ADAPTER_APPROVAL_SCHEMA_GUARD_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-adapter-approval-schema-guard-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_HANDOFF_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-operator-handoff-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-preflight-echo-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-precondition-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-dry-run-envelope-echo-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-operator-window-checklist-echo-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-dry-run-command-package-echo-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECHECK_PACKET_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-precheck-packet-echo-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-disabled-adapter-client-precheck-echo-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-connection-fake-transport-dry-run-packet-echo-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-handle-preflight-echo-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_ECHO_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-decision-echo-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ECHO_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_ECHO_MARKER_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-test-only-shell-echo-marker.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-fake-shell-archive-echo-receipt.v1";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_ECHO_RECEIPT_VERSION =
                    "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-production-readiness-blocked-decision-echo-receipt.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_APPROVAL_RECORD_HANDOFF_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v9";

    static final String RELEASE_APPROVAL_REHEARSAL_APPROVAL_HANDOFF_MARKER_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v10";

    static final String RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_ADAPTER_BOUNDARY_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v11";

    static final String RELEASE_APPROVAL_REHEARSAL_PRODUCTION_ADAPTER_PREREQUISITE_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v12";

    static final String RELEASE_APPROVAL_REHEARSAL_OPS_EVIDENCE_SERVICE_QUALITY_SPLIT_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v13";

    static final String RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_ADAPTER_IMPLEMENTATION_GUARD_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v14";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_EXTERNAL_ADAPTER_MIGRATION_GUARD_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v15";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ADAPTER_APPROVAL_SCHEMA_GUARD_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v16";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_HANDOFF_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v17";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v18";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v19";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v20";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v21";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v22";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECHECK_PACKET_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v23";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v24";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v25";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v26";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_ECHO_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v27";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ECHO_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v28";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_ECHO_MARKER_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v29";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v30";

    static final String
            RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_ECHO_RECEIPT_SCHEMA_VERSION =
                    "java-release-approval-rehearsal-response-schema.v31";

    static final String RELEASE_APPROVAL_REHEARSAL_FAILURE_TAXONOMY_VERSION =
            "java-release-approval-rehearsal-failure-taxonomy.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_VERIFICATION_HINT_VERSION =
            "java-release-approval-rehearsal-verification-hint.v1";

    static final String RELEASE_APPROVAL_REHEARSAL_RESPONSE_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v31";

    static final String NODE_V211_MANAGED_AUDIT_PROFILE_VERSION =
            "managed-audit-identity-approval-provenance-dry-run-packet.v1";

    static final String NODE_V211_MANAGED_AUDIT_PACKET_STATE = "dry-run-packet-verified";

    static final String NODE_V211_MANAGED_AUDIT_ENDPOINT =
            "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet";

    static final String NODE_V211_MANAGED_AUDIT_REQUEST_ID =
            "managed-audit-v211-identity-approval-provenance-request";

    static final String NODE_V211_MANAGED_AUDIT_PACKET_VERSION =
            "managed-audit-dry-run-record.v2-candidate";

    static final String NODE_V214_RESTORE_DRILL_ARCHIVE_VERIFICATION_PROFILE_VERSION =
            "managed-audit-restore-drill-archive-verification.v1";

    static final String NODE_V214_RESTORE_DRILL_ARCHIVE_VERIFICATION_STATE =
            "verified-restore-drill-archive";

    static final String NODE_V214_RESTORE_DRILL_ARCHIVE_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-restore-drill-archive-verification";

    static final String NODE_V215_MANAGED_AUDIT_DRY_RUN_ADAPTER_CANDIDATE_VERSION = "Node v215";

    static final String NODE_V215_MANAGED_AUDIT_DRY_RUN_ADAPTER_CANDIDATE_PROFILE =
            "managed-audit-dry-run-adapter-candidate.v1";

    static final String NODE_V216_DRY_RUN_ADAPTER_ARCHIVE_VERIFICATION_PROFILE_VERSION =
            "managed-audit-dry-run-adapter-archive-verification.v1";

    static final String NODE_V216_DRY_RUN_ADAPTER_ARCHIVE_VERIFICATION_STATE =
            "verified-dry-run-adapter-archive";

    static final String NODE_V216_DRY_RUN_ADAPTER_ARCHIVE_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification";

    static final String NODE_V217_PRODUCTION_HARDENING_READINESS_GATE_VERSION = "Node v217";

    static final String NODE_V217_PRODUCTION_HARDENING_READINESS_GATE_PROFILE =
            "managed-audit-adapter-production-hardening-readiness-gate.v1";

    static final String NODE_V218_AUDIT_ROUTE_MANAGED_AUDIT_HELPER_QUALITY_PASS_VERSION = "Node v218";

    static final String NODE_V218_AUDIT_ROUTE_MANAGED_AUDIT_HELPER_QUALITY_PASS_PROFILE =
            "audit-route-managed-audit-helper-quality-pass.v1";

    static final String NODE_V219_MANAGED_AUDIT_ADAPTER_IMPLEMENTATION_PRECHECK_VERSION = "Node v219";

    static final String NODE_V219_MANAGED_AUDIT_ADAPTER_IMPLEMENTATION_PRECHECK_PROFILE =
            "managed-audit-adapter-implementation-precheck-packet.v1";

    static final String NODE_V220_MANAGED_AUDIT_ADAPTER_DISABLED_SHELL_VERSION = "Node v220";

    static final String NODE_V220_MANAGED_AUDIT_ADAPTER_DISABLED_SHELL_PROFILE =
            "managed-audit-adapter-disabled-shell.v1";

    static final String NODE_V220_MANAGED_AUDIT_ADAPTER_DISABLED_SHELL_ENDPOINT =
            "/api/v1/audit/managed-audit-adapter-disabled-shell";

    static final String NODE_V221_MANAGED_AUDIT_LOCAL_ADAPTER_CANDIDATE_DRY_RUN_VERSION = "Node v221";

    static final String NODE_V221_MANAGED_AUDIT_LOCAL_ADAPTER_CANDIDATE_DRY_RUN_PROFILE =
            "managed-audit-local-adapter-candidate-dry-run.v1";

    static final String NODE_V222_MANAGED_AUDIT_LOCAL_ADAPTER_CANDIDATE_VERIFICATION_REPORT_VERSION = "Node v222";

    static final String NODE_V222_MANAGED_AUDIT_LOCAL_ADAPTER_CANDIDATE_VERIFICATION_REPORT_PROFILE =
            "managed-audit-local-adapter-candidate-verification-report.v1";

    static final String NODE_V222_MANAGED_AUDIT_LOCAL_ADAPTER_CANDIDATE_VERIFICATION_REPORT_ENDPOINT =
            "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report";

    static final String NODE_V223_MANAGED_AUDIT_EXTERNAL_ADAPTER_CONNECTION_READINESS_REVIEW_VERSION = "Node v223";

    static final String NODE_V223_MANAGED_AUDIT_EXTERNAL_ADAPTER_CONNECTION_READINESS_REVIEW_PROFILE =
            "managed-audit-external-adapter-connection-readiness-review.v1";

    static final String NODE_V227_MANUAL_SANDBOX_CONNECTION_EVIDENCE_CHECKLIST_VERSION = "Node v227";

    static final String NODE_V227_MANUAL_SANDBOX_CONNECTION_EVIDENCE_CHECKLIST_PROFILE =
            "managed-audit-manual-sandbox-connection-evidence-checklist.v1";

    static final String NODE_V228_MANUAL_SANDBOX_CONNECTION_OPERATOR_PACKET_VERSION = "Node v228";

    static final String NODE_V228_MANUAL_SANDBOX_CONNECTION_OPERATOR_PACKET_PROFILE =
            "managed-audit-manual-sandbox-connection-operator-packet.v1";

    static final String NODE_V228_MANUAL_SANDBOX_CONNECTION_OPERATOR_PACKET_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet";

    static final String NODE_V228_MANUAL_SANDBOX_CONNECTION_OPERATOR_PACKET_STATE =
            "manual-sandbox-connection-operator-packet-ready";

    static final String NODE_V229_MANUAL_SANDBOX_CONNECTION_PACKET_VERIFICATION_VERSION = "Node v229";

    static final String NODE_V229_MANUAL_SANDBOX_CONNECTION_PACKET_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-packet-verification.v1";

    static final String NODE_V230_MANUAL_SANDBOX_CONNECTION_PREFLIGHT_GATE_VERSION = "Node v230";

    static final String NODE_V230_MANUAL_SANDBOX_CONNECTION_PREFLIGHT_GATE_PROFILE =
            "managed-audit-manual-sandbox-connection-preflight-gate.v1";

    static final String NODE_V230_MANUAL_SANDBOX_CONNECTION_PREFLIGHT_GATE_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate";

    static final String NODE_V230_MANUAL_SANDBOX_CONNECTION_PREFLIGHT_GATE_STATE =
            "manual-sandbox-connection-preflight-gate-ready";

    static final String NODE_V231_MANUAL_SANDBOX_CONNECTION_PREFLIGHT_VERIFICATION_VERSION = "Node v231";

    static final String NODE_V231_MANUAL_SANDBOX_CONNECTION_PREFLIGHT_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-preflight-verification.v1";

    static final String NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_VERSION = "Node v234";

    static final String NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_PROFILE =
            "managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1";

    static final String NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal";

    static final String NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_STATE =
            "manual-sandbox-connection-blocked-execution-rehearsal-ready";

    static final String NODE_V235_MANUAL_SANDBOX_CONNECTION_PRECONDITION_INTAKE_VERSION = "Node v235";

    static final String NODE_V235_MANUAL_SANDBOX_CONNECTION_PRECONDITION_INTAKE_PROFILE =
            "managed-audit-manual-sandbox-connection-precondition-intake.v1";

    static final String NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_VERSION = "Node v236";

    static final String NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_PROFILE =
            "managed-audit-manual-sandbox-connection-dry-run-request-envelope.v1";

    static final String NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope";

    static final String NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_STATE =
            "manual-sandbox-connection-dry-run-request-envelope-ready";

    static final String NODE_V237_MANUAL_SANDBOX_CONNECTION_READINESS_GATE_VERSION = "Node v237";

    static final String NODE_V237_MANUAL_SANDBOX_CONNECTION_READINESS_GATE_PROFILE =
            "managed-audit-manual-sandbox-connection-readiness-gate.v1";

    static final String NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_VERSION = "Node v238";

    static final String NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_PROFILE =
            "managed-audit-manual-sandbox-connection-operator-window-checklist.v1";

    static final String NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist";

    static final String NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_STATE =
            "manual-sandbox-connection-operator-window-checklist-ready";

    static final String NODE_V239_MANUAL_SANDBOX_CONNECTION_EVIDENCE_VERIFICATION_VERSION = "Node v239";

    static final String NODE_V239_MANUAL_SANDBOX_CONNECTION_EVIDENCE_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1";

    static final String NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_VERSION = "Node v241";

    static final String NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_PROFILE =
            "managed-audit-manual-sandbox-connection-dry-run-command-package.v1";

    static final String NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package";

    static final String NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_STATE =
            "manual-sandbox-connection-dry-run-command-package-ready";

    static final String NODE_V244_MANUAL_SANDBOX_DRY_RUN_COMMAND_UPSTREAM_ECHO_VERIFICATION_VERSION =
            "Node v244";

    static final String NODE_V244_MANUAL_SANDBOX_DRY_RUN_COMMAND_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-dry-run-command-upstream-echo-verification.v1";

    static final String NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_VERSION = "Node v245";

    static final String NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_PROFILE =
            "managed-audit-manual-sandbox-connection-precheck-packet.v1";

    static final String NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet";

    static final String NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_STATE =
            "manual-sandbox-connection-precheck-packet-ready";

    static final String NODE_V246_MANUAL_SANDBOX_CONNECTION_PRECHECK_UPSTREAM_RECEIPT_VERIFICATION_VERSION =
            "Node v246";

    static final String NODE_V246_MANUAL_SANDBOX_CONNECTION_PRECHECK_UPSTREAM_RECEIPT_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1";

    static final String NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_VERSION = "Node v252";

    static final String NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_PROFILE =
            "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1";

    static final String NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck";

    static final String NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_STATE =
            "disabled-adapter-client-precheck-ready";

    static final String NODE_V253_TEST_ONLY_ADAPTER_SHELL_CONTRACT_VERSION = "Node v253";

    static final String NODE_V253_TEST_ONLY_ADAPTER_SHELL_CONTRACT_PROFILE =
            "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1";

    static final String NODE_V254_DISABLED_ADAPTER_CLIENT_UPSTREAM_ECHO_VERIFICATION_VERSION =
            "Node v254";

    static final String NODE_V254_DISABLED_ADAPTER_CLIENT_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1";

    static final String NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_VERSION = "Node v255";

    static final String NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_PROFILE =
            "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1";

    static final String NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet";

    static final String NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_STATE =
            "fake-transport-adapter-dry-run-verification-packet-ready";

    static final String NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_VERSION = "Node v256";

    static final String NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1";

    static final String NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification";

    static final String NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_STATE =
            "fake-transport-packet-archive-verification-ready";

    static final String NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_VERSION = "Node v257";

    static final String NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1";

    static final String NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification";

    static final String NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_STATE =
            "fake-transport-packet-upstream-echo-verification-ready";

    static final String NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_VERSION = "Node v258";

    static final String NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1";

    static final String NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review";

    static final String NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_MARKDOWN_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review?format=markdown";

    static final String NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_STATE =
            "sandbox-endpoint-handle-preflight-review-ready";

    static final String NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_VERSION = "Node v259";

    static final String NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification.v1";

    static final String NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification";

    static final String NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_STATE =
            "sandbox-endpoint-handle-upstream-echo-verification-ready";

    static final String NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_VERSION = "Node v260";

    static final String NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1";

    static final String NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record";

    static final String NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_MARKDOWN_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record?format=markdown";

    static final String NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_STATE =
            "sandbox-endpoint-credential-resolver-decision-record-ready";

    static final String NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_VERSION =
            "Node v261";

    static final String NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1";

    static final String NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_STATE =
            "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready";

    static final String NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_VERSION =
            "Node v262";

    static final String NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1";

    static final String NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck";

    static final String NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_MARKDOWN_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck?format=markdown";

    static final String NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_STATE =
            "sandbox-endpoint-credential-resolver-disabled-precheck-ready";

    static final String NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_VERSION =
            "Node v263";

    static final String NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1";

    static final String NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_STATE =
            "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready";

    static final String NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_VERSION =
            "Node v264";

    static final String NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1";

    static final String NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract";

    static final String NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_MARKDOWN_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract?format=markdown";

    static final String NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_STATE =
            "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready";

    static final String NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_VERSION =
            "Node v265";

    static final String NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1";

    static final String NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification";

    static final String
            NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_MARKDOWN_ENDPOINT =
                    "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification?format=markdown";

    static final String NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_STATE =
            "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready";

    static final String NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_VERSION =
            "Node v266";

    static final String NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_PROFILE =
            "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1";

    static final String NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification";

    static final String
            NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_MARKDOWN_ENDPOINT =
                    "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification?format=markdown";

    static final String NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_STATE =
            "credential-resolver-fake-shell-archive-verification-ready";

    static final String
            NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_VERSION =
                    "Node v267";

    static final String
            NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_PROFILE =
                    "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1";

    static final String NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_VERSION =
            "Node v268";

    static final String NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_PROFILE =
            "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1";

    static final String NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate";

    static final String NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_MARKDOWN_ENDPOINT =
            "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate?format=markdown";

    static final String NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_STATE =
            "blocked";

    static final String NODE_V210_APPROVAL_BINDING_CONTRACT_VERSION =
            "managed-audit-identity-approval-binding-contract.v1";

    private static final String REAL_REPLAY_ENDPOINT = "/api/v1/failed-events/{id}/replay";

    private final Instant startedAt = Instant.now();

    private final FailedEventSummaryService failedEventSummaryService;

    private final OutboxRepository outboxRepository;

    private final OutboxPublisherProperties outboxPublisherProperties;

    private final OutboxRabbitMqProperties outboxRabbitMqProperties;

    private final IdempotencyStore idempotencyStore;

    private final Environment environment;

    public OpsEvidenceService(
            FailedEventSummaryService failedEventSummaryService,
            OutboxRepository outboxRepository,
            OutboxPublisherProperties outboxPublisherProperties,
            OutboxRabbitMqProperties outboxRabbitMqProperties,
            IdempotencyStore idempotencyStore,
            Environment environment
    ) {
        this.failedEventSummaryService = failedEventSummaryService;
        this.outboxRepository = outboxRepository;
        this.outboxPublisherProperties = outboxPublisherProperties;
        this.outboxRabbitMqProperties = outboxRabbitMqProperties;
        this.idempotencyStore = idempotencyStore;
        this.environment = environment;
    }

    @Transactional(readOnly = true)
    public OpsEvidenceResponse evidence() {
        Instant sampledAt = Instant.now();
        FailedEventSummaryResponse failedEventSummary = failedEventSummaryService.summary();
        long pendingOutboxEvents = outboxRepository.countByPublishedAtIsNull();
        List<String> outboxBlockers = outboxBlockers();
        List<String> executionBlockers = executionBlockers(failedEventSummary);
        List<String> blockers = blockers(outboxBlockers, executionBlockers);
        OpsEvidenceStaticReleaseDispatchTable.StaticReleaseEvidence staticReleaseEvidence =
                OpsEvidenceStaticReleaseDispatchTable.build();

        return new OpsEvidenceResponse(
                sampledAt,
                EVIDENCE_VERSION,
                service(sampledAt),
                healthProbe(false),
                true,
                false,
                readOnlyWindow(true),
                orderIdempotency(),
                staticReleaseEvidence.releaseVerification(),
                staticReleaseEvidence.deploymentRollback(),
                staticReleaseEvidence.releaseBundle(),
                staticReleaseEvidence.releaseHandoffChecklistFixture(),
                staticReleaseEvidence.releaseAuditRetentionFixture(),
                staticReleaseEvidence.releaseOperatorSignoffFixture(),
                staticReleaseEvidence.rollbackApproverEvidenceFixture(),
                staticReleaseEvidence.rollbackApprovalHandoff(),
                staticReleaseEvidence.rollbackApprovalRecordFixture(),
                staticReleaseEvidence.rollbackSqlReviewGate(),
                staticReleaseEvidence.productionSecretSourceContract(),
                staticReleaseEvidence.productionDeploymentRunbookContract(),
                failedEventReplay(failedEventSummary),
                outbox(pendingOutboxEvents, outboxBlockers),
                approvalExecution(executionBlockers),
                blockers,
                warnings(failedEventSummary, pendingOutboxEvents),
                evidenceEndpoints()
        );
    }

    @Transactional(readOnly = true)
    public ReleaseApprovalRehearsalResponse releaseApprovalRehearsal() {
        return releaseApprovalRehearsal(ReleaseApprovalRehearsalRequest.empty());
    }

    @Transactional(readOnly = true)
    public ReleaseApprovalRehearsalResponse releaseApprovalRehearsal(ReleaseApprovalRehearsalRequest request) {
        return new ReleaseApprovalRehearsalResponseBuilder()
                .build(evidence(), request);
    }

    private OpsEvidenceResponse.Service service(Instant sampledAt) {
        return new OpsEvidenceResponse.Service(
                environment.getProperty("spring.application.name", "advanced-order-platform"),
                environment.getProperty("info.app.version", "0.1.0-SNAPSHOT"),
                profiles(),
                startedAt,
                Math.max(Duration.between(startedAt, sampledAt).toSeconds(), 0)
        );
    }

    private OpsEvidenceResponse.HealthProbe healthProbe(boolean staticSampleOnly) {
        List<String> additionalProbeEndpoints = new ArrayList<>();
        additionalProbeEndpoints.add("/api/v1/ops/overview");
        additionalProbeEndpoints.add(RELEASE_APPROVAL_REHEARSAL_ENDPOINT);
        additionalProbeEndpoints.addAll(OpsEvidenceStaticReleaseDispatchTable.staticContractEndpoints(false));

        return new OpsEvidenceResponse.HealthProbe(
                "/actuator/health",
                "GET",
                "UP",
                "/api/v1/ops/evidence",
                List.copyOf(additionalProbeEndpoints),
                true,
                staticSampleOnly
        );
    }

    private OpsEvidenceResponse.ReadOnlyWindow readOnlyWindow(boolean readyForReadOnlyLiveProbe) {
        List<String> allowedProbeEndpoints = new ArrayList<>();
        allowedProbeEndpoints.add("GET /actuator/health");
        allowedProbeEndpoints.add("GET /api/v1/ops/overview");
        allowedProbeEndpoints.add("GET /api/v1/ops/evidence");
        allowedProbeEndpoints.add("GET " + RELEASE_APPROVAL_REHEARSAL_ENDPOINT);
        allowedProbeEndpoints.addAll(OpsEvidenceStaticReleaseDispatchTable.staticContractProbeEndpoints(false));

        return new OpsEvidenceResponse.ReadOnlyWindow(
                "java-read-only-window.v1",
                true,
                false,
                true,
                false,
                readyForReadOnlyLiveProbe,
                false,
                List.copyOf(allowedProbeEndpoints),
                List.of(
                        "POST /api/v1/orders",
                        "POST /api/v1/failed-events/{id}/replay",
                        "RabbitMQ replay publish",
                        "Outbox mutation",
                        "Any non-GET Node upstream action"
                ),
                List.of(
                        "UPSTREAM_PROBES_ENABLED=true",
                        "UPSTREAM_ACTIONS_ENABLED=false"
                ),
                "Node real-read window must not call POST /api/v1/failed-events/{id}/replay"
        );
    }

    private OpsEvidenceResponse.OrderIdempotency orderIdempotency() {
        IdempotencyStoreDescriptor descriptor = idempotencyStore.descriptor();
        return new OpsEvidenceResponse.OrderIdempotency(
                "java-order-idempotency-boundary.v1",
                descriptor.abstractionVersion(),
                "/api/v1/orders",
                "POST",
                "Idempotency-Key",
                120,
                "order-create-request-sha256.v1",
                "customerId plus aggregated productId:quantity pairs sorted by productId",
                "HTTP 200 replay of the existing order without a second inventory reservation or outbox event",
                "HTTP 409 conflict before inventory reservation and before outbox mutation",
                "IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_REQUEST",
                descriptor.activeStore(),
                descriptor.activeImplementation(),
                descriptor.activeMode(),
                descriptor.authoritativeStore() + " via " + descriptor.keyColumn()
                        + " and " + descriptor.fingerprintColumn(),
                List.of(
                        new OpsEvidenceResponse.IdempotencyStoreCandidate(
                                descriptor.activeStore(),
                                "ORDER_CREATE_IDEMPOTENCY_AUTHORITY",
                                true,
                                true,
                                descriptor.activeMode(),
                                "Default Java database-backed idempotency store"
                        ),
                        new OpsEvidenceResponse.IdempotencyStoreCandidate(
                                JpaIdempotencyStore.MINI_KV_CANDIDATE,
                                "TTL_TOKEN_CANDIDATE",
                                descriptor.miniKvAdapterEnabled(),
                                descriptor.miniKvConnected(),
                                descriptor.miniKvCandidateMode(),
                                descriptor.disabledCandidateReason()
                        )
                ),
                descriptor.miniKvConnected(),
                descriptor.externalTokenStoreConnected(),
                descriptor.changesPaymentOrInventoryTransaction()
        );
    }

    private List<String> profiles() {
        String[] activeProfiles = environment.getActiveProfiles();
        if (activeProfiles.length > 0) {
            return List.copyOf(Arrays.asList(activeProfiles));
        }
        return List.copyOf(Arrays.asList(environment.getDefaultProfiles()));
    }

    private OpsEvidenceResponse.FailedEventReplay failedEventReplay(FailedEventSummaryResponse summary) {
        return new OpsEvidenceResponse.FailedEventReplay(
                summary.totalFailedEvents(),
                summary.replayBacklog(),
                summary.pendingReplayApprovals(),
                summary.approvedReplayApprovals(),
                summary.rejectedReplayApprovals(),
                summary.latestFailedAt(),
                summary.latestApprovalAt(),
                REAL_REPLAY_ENDPOINT,
                false
        );
    }

    private OpsEvidenceResponse.Outbox outbox(long pendingOutboxEvents, List<String> outboxBlockers) {
        return new OpsEvidenceResponse.Outbox(
                pendingOutboxEvents,
                outboxPublisherProperties.isEnabled(),
                outboxRabbitMqProperties.isEnabled(),
                outboxRabbitMqProperties.getExchange(),
                outboxRabbitMqProperties.getQueue(),
                outboxRabbitMqProperties.getDeadLetterQueue(),
                outboxBlockers
        );
    }

    private OpsEvidenceResponse.ApprovalExecution approvalExecution(List<String> executionBlockers) {
        return new OpsEvidenceResponse.ApprovalExecution(
                "APPROVED",
                "contractDigest must match latest approval-status/readiness evidence before POST /replay",
                true,
                true,
                executionBlockers,
                List.of(
                        "GET /api/v1/failed-events/summary",
                        "GET /api/v1/failed-events/{id}/replay-readiness",
                        "GET /api/v1/failed-events/{id}/replay-execution-contract"
                )
        );
    }

    private List<String> outboxBlockers() {
        List<String> blockers = new ArrayList<>();
        if (!outboxPublisherProperties.isEnabled()) {
            blockers.add("OUTBOX_PUBLISHER_DISABLED");
        }
        if (!outboxRabbitMqProperties.isEnabled()) {
            blockers.add("RABBITMQ_OUTBOX_DISABLED");
        }
        return List.copyOf(blockers);
    }

    private List<String> executionBlockers(FailedEventSummaryResponse summary) {
        List<String> blockers = new ArrayList<>();
        blockers.add("READ_ONLY_EVIDENCE_ENDPOINT");
        if (summary.pendingReplayApprovals() > 0) {
            blockers.add("REPLAY_APPROVAL_PENDING");
        }
        if (summary.rejectedReplayApprovals() > 0) {
            blockers.add("REPLAY_APPROVAL_REJECTED");
        }
        if (summary.replayBacklog() > 0) {
            blockers.add("REPLAY_BACKLOG_PRESENT");
        }
        return List.copyOf(blockers);
    }

    private List<String> blockers(List<String> outboxBlockers, List<String> executionBlockers) {
        List<String> blockers = new ArrayList<>();
        blockers.addAll(executionBlockers);
        blockers.addAll(outboxBlockers);
        return List.copyOf(blockers);
    }

    private List<String> warnings(FailedEventSummaryResponse summary, long pendingOutboxEvents) {
        List<String> warnings = new ArrayList<>();
        if (pendingOutboxEvents > 0) {
            warnings.add("OUTBOX_PENDING_EVENTS");
        }
        if (summary.approvedReplayApprovals() > 0) {
            warnings.add("APPROVED_REPLAY_REQUIRES_DIGEST_CHECK");
        }
        return List.copyOf(warnings);
    }

    private List<String> evidenceEndpoints() {
        List<String> endpoints = new ArrayList<>();
        endpoints.add("/api/v1/ops/overview");
        endpoints.add("/api/v1/ops/evidence");
        endpoints.add(RELEASE_APPROVAL_REHEARSAL_ENDPOINT);
        endpoints.addAll(OpsEvidenceStaticReleaseDispatchTable.staticContractEndpoints(true));
        endpoints.addAll(List.of(
                "/api/v1/failed-events/summary",
                "/api/v1/failed-events/{id}/approval-status",
                "/api/v1/failed-events/{id}/replay-readiness",
                "/api/v1/failed-events/{id}/replay-execution-contract",
                "/api/v1/failed-events/replay-evidence-index",
                "/contracts/failed-event-replay-execution-contract-approved.sample.json",
                "/contracts/failed-event-replay-execution-contract-blocked.sample.json"
        ));
        return List.copyOf(endpoints);
    }
}
