import { dashboardClientScript } from "./dashboardClientScript.js";
import { dashboardMarkup } from "./dashboardMarkup.js";
import { dashboardStyles } from "./dashboardStyles.js";

export function dashboardHtml(): string {
  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3E%3Crect%20width='64'%20height='64'%20rx='12'%20fill='%232557a7'/%3E%3Ccircle%20cx='32'%20cy='32'%20r='15'%20fill='none'%20stroke='white'%20stroke-width='7'/%3E%3C/svg%3E">
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
