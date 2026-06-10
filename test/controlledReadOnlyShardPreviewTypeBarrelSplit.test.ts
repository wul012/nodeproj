import { describe, expectTypeOf, it } from "vitest";

import type {
  ControlledReadOnlyShardPreviewEvidenceEndpoints,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope,
  ControlledReadOnlyShardPreviewPreviewGraph,
  ControlledReadOnlyShardPreviewProfile,
  ControlledReadOnlyShardPreviewReads,
  ControlledReadOnlyShardPreviewSourceMatrix,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";
import type {
  ControlledReadOnlyShardPreviewEvidenceEndpoints as ControlledReadOnlyShardPreviewEvidenceEndpointsModule,
  ControlledReadOnlyShardPreviewPreviewGraph as ControlledReadOnlyShardPreviewPreviewGraphModule,
  ControlledReadOnlyShardPreviewProfile as ControlledReadOnlyShardPreviewProfileModule,
  ControlledReadOnlyShardPreviewReads as ControlledReadOnlyShardPreviewReadsModule,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewProfileTypes.js";
import type { ControlledReadOnlyShardPreviewSourceMatrix as ControlledReadOnlyShardPreviewSourceMatrixModule } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixTypes.js";
import type { ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope as ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeModule } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeTypes.js";

describe("Controlled read-only shard preview type barrel split", () => {
  it("keeps profile and downstream type exports available from the stable barrel", () => {
    expectTypeOf<ControlledReadOnlyShardPreviewProfile>().toEqualTypeOf<
      ControlledReadOnlyShardPreviewProfileModule
    >();
    expectTypeOf<ControlledReadOnlyShardPreviewSourceMatrix>().toEqualTypeOf<
      ControlledReadOnlyShardPreviewSourceMatrixModule
    >();
    expectTypeOf<
      ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope
    >().toEqualTypeOf<
      ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeModule
    >();
    expectTypeOf<ControlledReadOnlyShardPreviewReads>().toEqualTypeOf<
      ControlledReadOnlyShardPreviewReadsModule
    >();
    expectTypeOf<ControlledReadOnlyShardPreviewPreviewGraph>().toEqualTypeOf<
      ControlledReadOnlyShardPreviewPreviewGraphModule
    >();
    expectTypeOf<ControlledReadOnlyShardPreviewEvidenceEndpoints>().toEqualTypeOf<
      ControlledReadOnlyShardPreviewEvidenceEndpointsModule
    >();
  });
});
