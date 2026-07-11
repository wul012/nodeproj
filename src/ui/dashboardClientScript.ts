import { dashboardClientActionsScript } from "./dashboardClientActionsScript.js";
import { dashboardClientCoreScript } from "./dashboardClientCoreScript.js";
import { dashboardClientOperationsScript } from "./dashboardClientOperationsScript.js";

export const dashboardClientScript =
  dashboardClientCoreScript + dashboardClientOperationsScript + dashboardClientActionsScript;
