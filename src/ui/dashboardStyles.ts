export const dashboardStyles = String.raw`
    :root {
      color-scheme: light;
      --bg: #f6f7f9;
      --panel: #ffffff;
      --panel-soft: #eef3f8;
      --text: #172033;
      --muted: #667085;
      --line: #d9e0e8;
      --ok: #18794e;
      --warn: #b54708;
      --bad: #b42318;
      --accent: #2557a7;
      --accent-2: #0f766e;
      --shadow: 0 10px 30px rgba(23, 32, 51, 0.08);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      letter-spacing: 0;
    }

    button,
    input,
    select,
    textarea {
      font: inherit;
    }

    .shell {
      max-width: 1240px;
      margin: 0 auto;
      padding: 20px;
    }

    .topbar {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 20px;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .brand h1 {
      margin: 0;
      font-size: 24px;
      line-height: 1.15;
    }

    .brand span,
    .time {
      color: var(--muted);
      font-size: 13px;
    }

    .grid {
      display: grid;
      gap: 16px;
    }

    .status-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-bottom: 16px;
    }

    .work-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: start;
    }

    .audit-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
      margin-bottom: 16px;
    }

    .overview-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-bottom: 16px;
    }

    .card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 16px;
      min-width: 0;
    }

    .status-card {
      min-height: 132px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: space-between;
    }

    .card h2 {
      margin: 0 0 14px;
      font-size: 16px;
      line-height: 1.2;
    }

    .metric-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .metric-name {
      font-size: 14px;
      color: var(--muted);
    }

    .metric-value {
      font-size: 28px;
      line-height: 1;
      font-weight: 750;
      overflow-wrap: anywhere;
    }

    .badge {
      min-width: 74px;
      min-height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      border: 1px solid transparent;
    }

    .online {
      color: var(--ok);
      background: #e9f7ef;
      border-color: #b7e4c7;
    }

    .degraded {
      color: var(--warn);
      background: #fff4e5;
      border-color: #ffd8a8;
    }

    .offline {
      color: var(--bad);
      background: #fff0f0;
      border-color: #ffc9c9;
    }

    .disabled {
      color: #475467;
      background: #f2f4f7;
      border-color: #d0d5dd;
    }

    .muted {
      color: var(--muted);
      font-size: 13px;
      overflow-wrap: anywhere;
    }

    .signal-list {
      display: grid;
      gap: 8px;
    }

    .signal-row {
      display: grid;
      grid-template-columns: minmax(120px, 0.7fr) minmax(0, 1fr);
      gap: 10px;
      align-items: baseline;
      min-height: 24px;
      border-bottom: 1px solid #eef2f6;
      padding-bottom: 7px;
    }

    .signal-row:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .signal-label {
      color: var(--muted);
      font-size: 12px;
    }

    .signal-value {
      font-size: 13px;
      font-weight: 700;
      overflow-wrap: anywhere;
    }

    .row {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .row input,
    .row select {
      flex: 1 1 220px;
      min-width: 180px;
    }

    .row button {
      flex: 0 1 auto;
      min-width: 0;
    }

    .stack {
      display: grid;
      gap: 10px;
    }

    input,
    select,
    textarea {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fff;
      color: var(--text);
      padding: 10px 11px;
      min-height: 40px;
      outline: none;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(37, 87, 167, 0.14);
    }

    select {
      appearance: none;
      cursor: pointer;
    }

    textarea {
      resize: vertical;
      min-height: 96px;
      line-height: 1.45;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      font-size: 13px;
    }

    button {
      max-width: 100%;
      min-height: 40px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fff;
      color: var(--text);
      padding: 8px 12px;
      font-weight: 650;
      cursor: pointer;
      overflow-wrap: anywhere;
      white-space: normal;
    }

    button.primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }

    button.secondary {
      background: var(--accent-2);
      border-color: var(--accent-2);
      color: #fff;
    }

    button:disabled {
      cursor: wait;
      opacity: 0.7;
    }

    .output {
      min-height: 180px;
      max-height: 420px;
      overflow: auto;
      border-radius: 6px;
      border: 1px solid var(--line);
      background: #101828;
      color: #d8dee9;
      padding: 12px;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    @media (max-width: 880px) {
      .status-grid,
      .work-grid,
      .audit-grid,
      .overview-grid,
      .split {
        grid-template-columns: 1fr;
      }

      .topbar {
        align-items: flex-start;
        flex-direction: column;
      }
    }
`;
