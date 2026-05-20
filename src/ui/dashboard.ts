import { dashboardClientScript } from "./dashboardClientScript.js";
import { dashboardMarkup } from "./dashboardMarkup.js";
import { dashboardStyles } from "./dashboardStyles.js";

export function dashboardHtml(): string {
  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OrderOps</title>
  <style>
${dashboardStyles}
  </style>
</head>
<body>
${dashboardMarkup}
  <script>
${dashboardClientScript}
  </script>
</body>
</html>`;
}
