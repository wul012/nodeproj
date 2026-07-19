export const dashboardScenarioMarkup = String.raw`
    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Scenario Matrix</h2>
          <div class="badge disabled" id="scenarioMatrixState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Matrix digest</div>
            <div class="signal-value" id="scenarioMatrixDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Scenarios</div>
            <div class="signal-value" id="scenarioMatrixCountSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Issues</div>
            <div class="signal-value" id="scenarioMatrixIssueSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Endpoints</div>
            <div class="signal-value">
              <a id="scenarioMatrixJsonLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix">JSON</a>
              /
              <a id="scenarioMatrixMarkdownLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Java Scenario Matrix</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Approved replay</div>
            <div class="signal-value" id="scenarioJavaApprovedSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Blocked replay</div>
            <div class="signal-value" id="scenarioJavaBlockedSignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>mini-kv Scenario Matrix</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Write CHECKJSON</div>
            <div class="signal-value" id="scenarioMiniKvWriteSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Read CHECKJSON</div>
            <div class="signal-value" id="scenarioMiniKvReadSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Drift</div>
            <div class="signal-value" id="scenarioMatrixDriftSignal">-</div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Scenario Verification</h2>
          <div class="badge disabled" id="scenarioVerificationState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Verification</div>
            <div class="signal-value" id="scenarioVerificationValidSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Matrix digest</div>
            <div class="signal-value" id="scenarioVerificationDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Scenario count</div>
            <div class="signal-value" id="scenarioVerificationScenarioCountSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Endpoints</div>
            <div class="signal-value">
              <a id="scenarioVerificationJsonLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification">JSON</a>
              /
              <a id="scenarioVerificationMarkdownLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Scenario Semantics</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Java blocked replay</div>
            <div class="signal-value" id="scenarioVerificationBlockedReplaySignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">mini-kv read</div>
            <div class="signal-value" id="scenarioVerificationMiniKvReadSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Matrix validity</div>
            <div class="signal-value" id="scenarioVerificationMatrixValiditySignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Scenario Coverage</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Expected IDs</div>
            <div class="signal-value" id="scenarioVerificationExpectedIdsSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Source paths</div>
            <div class="signal-value" id="scenarioVerificationSourcePathsSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Drift count</div>
            <div class="signal-value" id="scenarioVerificationDriftSignal">-</div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Scenario Archive Bundle</h2>
          <div class="badge disabled" id="scenarioArchiveBundleState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Bundle valid</div>
            <div class="signal-value" id="scenarioArchiveBundleValidSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Read / execute</div>
            <div class="signal-value" id="scenarioArchiveBundleReadExecuteSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Source paths</div>
            <div class="signal-value" id="scenarioArchiveBundleSourcePathSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Endpoints</div>
            <div class="signal-value">
              <a id="scenarioArchiveBundleJsonLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle">JSON</a>
              /
              <a id="scenarioArchiveBundleMarkdownLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Archive Bundle Digests</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Archive bundle</div>
            <div class="signal-value" id="scenarioArchiveBundleDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Verification</div>
            <div class="signal-value" id="scenarioArchiveBundleVerificationDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Matrix</div>
            <div class="signal-value" id="scenarioArchiveBundleMatrixDigestSignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Archive Bundle Coverage</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Scenarios</div>
            <div class="signal-value" id="scenarioArchiveBundleScenarioSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Issue count</div>
            <div class="signal-value" id="scenarioArchiveBundleIssueSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Evidence</div>
            <div class="signal-value" id="scenarioArchiveBundleEvidenceSignal">-</div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid overview-grid">
      <article class="card">
        <div class="metric-head">
          <h2>Scenario Archive Verification</h2>
          <div class="badge disabled" id="scenarioArchiveVerificationState">pending</div>
        </div>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Verification valid</div>
            <div class="signal-value" id="scenarioArchiveVerificationValidSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Archive digest</div>
            <div class="signal-value" id="scenarioArchiveVerificationDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Verification digest</div>
            <div class="signal-value" id="scenarioArchiveVerificationVerificationDigestSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Endpoints</div>
            <div class="signal-value">
              <a id="scenarioArchiveVerificationJsonLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification">JSON</a>
              /
              <a id="scenarioArchiveVerificationMarkdownLink" href="/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification?format=markdown">Markdown</a>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Archive Verification Boundaries</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Read only</div>
            <div class="signal-value" id="scenarioArchiveVerificationReadOnlySignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Execution blocked</div>
            <div class="signal-value" id="scenarioArchiveVerificationExecutionSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Bundle validity</div>
            <div class="signal-value" id="scenarioArchiveVerificationBundleValiditySignal">-</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Archive Verification Coverage</h2>
        <div class="signal-list">
          <div class="signal-row">
            <div class="signal-label">Source paths</div>
            <div class="signal-value" id="scenarioArchiveVerificationSourcePathSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Scenario evidence</div>
            <div class="signal-value" id="scenarioArchiveVerificationScenarioEvidenceSignal">-</div>
          </div>
          <div class="signal-row">
            <div class="signal-label">Issues</div>
            <div class="signal-value" id="scenarioArchiveVerificationIssueSignal">-</div>
          </div>
        </div>
      </article>
    </section>
`;
