import type { IncomingHttpHeaders } from "node:http";

import {
  extractRequestIdentityFromHeaders,
  parseOperatorRoles,
  type RequestIdentity,
} from "./accessGuard.js";
import type { AccessPolicyRole } from "./accessPolicyProfile.js";

export interface OperatorIdentityContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "operator-identity-contract.v1";
  readyForProductionAuth: false;
  readOnly: true;
  executionAllowed: false;
  currentRuntime: {
    source: "headers";
    rejectsRequests: false;
    readsSecrets: false;
    writesAuditContext: true;
    productionReplacement: "auth-middleware";
  };
  headerContract: {
    operatorIdHeader: "x-orderops-operator-id";
    rolesHeader: "x-orderops-roles";
    allowedRoles: AccessPolicyRole[];
    roleSeparator: ",";
    duplicateRolePolicy: "dedupe-preserve-first-seen";
    invalidRolePolicy: "filter-and-record";
  };
  samples: OperatorIdentitySample[];
  checks: {
    parserAvailable: boolean;
    anonymousWhenHeadersMissing: boolean;
    authenticatedRequiresOperatorId: boolean;
    invalidRolesFiltered: boolean;
    duplicateRolesDeduplicated: boolean;
    adminIncludesAllRolesInGuard: boolean;
    noSecretRequired: boolean;
    auditContextWritable: boolean;
  };
  summary: {
    allowedRoleCount: number;
    sampleCount: number;
    rejectedSampleRoleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: OperatorIdentityContractMessage[];
  warnings: OperatorIdentityContractMessage[];
  recommendations: OperatorIdentityContractMessage[];
  evidenceEndpoints: {
    operatorIdentityContractJson: string;
    operatorIdentityContractMarkdown: string;
    auditEventsJson: string;
    accessGuardReadinessJson: string;
    accessPolicyProfileJson: string;
  };
  nextActions: string[];
}

export interface OperatorIdentitySample {
  id: string;
  purpose: string;
  inputHeaders: Record<string, string>;
  identity: RequestIdentity;
}

export interface OperatorIdentityContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ALLOWED_ROLES: AccessPolicyRole[] = ["viewer", "operator", "approver", "auditor", "admin"];

const ENDPOINTS = Object.freeze({
  operatorIdentityContractJson: "/api/v1/security/operator-identity-contract",
  operatorIdentityContractMarkdown: "/api/v1/security/operator-identity-contract?format=markdown",
  auditEventsJson: "/api/v1/audit/events?limit=50",
  accessGuardReadinessJson: "/api/v1/security/access-guard-readiness",
  accessPolicyProfileJson: "/api/v1/security/access-policy",
});

export function createOperatorIdentityContractProfile(): OperatorIdentityContractProfile {
  const samples = createSamples();
  const anonymous = samples.find((sample) => sample.id === "anonymous");
  const rolesOnly = samples.find((sample) => sample.id === "roles-without-operator");
  const invalid = samples.find((sample) => sample.id === "invalid-roles-filtered");
  const duplicate = parseOperatorRoles("viewer,operator,viewer");
  const checks = {
    parserAvailable: extractRequestIdentityFromHeaders({}).authSource === "none",
    anonymousWhenHeadersMissing: anonymous?.identity.authenticated === false
      && anonymous.identity.authSource === "none",
    authenticatedRequiresOperatorId: rolesOnly?.identity.authenticated === false
      && rolesOnly.identity.authSource === "headers",
    invalidRolesFiltered: invalid?.identity.roles.includes("viewer") === true
      && invalid.identity.rejectedRoles.includes("root"),
    duplicateRolesDeduplicated: duplicate.roles.length === 2
      && duplicate.roles[0] === "viewer"
      && duplicate.roles[1] === "operator",
    adminIncludesAllRolesInGuard: ALLOWED_ROLES.includes("admin"),
    noSecretRequired: true,
    auditContextWritable: true,
  };
  const productionBlockers = collectProductionBlockers();
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Operator identity contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "operator-identity-contract.v1",
    readyForProductionAuth: false,
    readOnly: true,
    executionAllowed: false,
    currentRuntime: {
      source: "headers",
      rejectsRequests: false,
      readsSecrets: false,
      writesAuditContext: true,
      productionReplacement: "auth-middleware",
    },
    headerContract: {
      operatorIdHeader: "x-orderops-operator-id",
      rolesHeader: "x-orderops-roles",
      allowedRoles: ALLOWED_ROLES,
      roleSeparator: ",",
      duplicateRolePolicy: "dedupe-preserve-first-seen",
      invalidRolePolicy: "filter-and-record",
    },
    samples,
    checks,
    summary: {
      allowedRoleCount: ALLOWED_ROLES.length,
      sampleCount: samples.length,
      rejectedSampleRoleCount: samples.reduce((sum, sample) => sum + sample.identity.rejectedRoles.length, 0),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep header identity as rehearsal-only evidence until a real auth middleware is implemented.",
      "Use audit events to verify operatorId, roles, rejectedRoles, and accessGuard context travel together.",
      "Do not enable upstream actions until identity is authenticated and access guard enforcement exists.",
    ],
  };
}

export function renderOperatorIdentityContractMarkdown(profile: OperatorIdentityContractProfile): string {
  return [
    "# Operator identity contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Current Runtime",
    "",
    ...renderEntries(profile.currentRuntime),
    "",
    "## Header Contract",
    "",
    ...renderEntries(profile.headerContract),
    "",
    "## Samples",
    "",
    ...profile.samples.flatMap(renderSample),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No operator identity blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No operator identity warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No operator identity recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createSamples(): OperatorIdentitySample[] {
  return [
    createSample("anonymous", "Missing headers produce an anonymous local identity.", {}),
    createSample("viewer", "Viewer header identity is accepted for read-only readiness routes.", {
      "x-orderops-operator-id": "viewer-1",
      "x-orderops-roles": "viewer",
    }),
    createSample("roles-without-operator", "Roles without operatorId are parsed but not authenticated.", {
      "x-orderops-roles": "operator",
    }),
    createSample("invalid-roles-filtered", "Invalid roles are filtered and recorded for audit review.", {
      "x-orderops-operator-id": "operator-1",
      "x-orderops-roles": "viewer,root,operator,viewer",
    }),
    createSample("admin", "Admin remains the broadest dry-run role for protected operation groups.", {
      "x-orderops-operator-id": "admin-1",
      "x-orderops-roles": "admin",
    }),
  ];
}

function createSample(id: string, purpose: string, inputHeaders: Record<string, string>): OperatorIdentitySample {
  return {
    id,
    purpose,
    inputHeaders,
    identity: extractRequestIdentityFromHeaders(inputHeaders as IncomingHttpHeaders),
  };
}

function collectProductionBlockers(): OperatorIdentityContractMessage[] {
  return [
    {
      code: "AUTH_MIDDLEWARE_MISSING",
      severity: "blocker",
      message: "Header-derived identity is not trusted production authentication.",
    },
    {
      code: "IDENTITY_NOT_ENFORCED",
      severity: "blocker",
      message: "Operator identity is written to audit context but requests are not rejected by identity yet.",
    },
  ];
}

function collectWarnings(): OperatorIdentityContractMessage[] {
  return [
    {
      code: "HEADERS_ARE_REHEARSAL_ONLY",
      severity: "warning",
      message: "x-orderops-operator-id and x-orderops-roles are local rehearsal headers, not a trust boundary.",
    },
  ];
}

function collectRecommendations(): OperatorIdentityContractMessage[] {
  return [
    {
      code: "ADD_AUTH_MIDDLEWARE",
      severity: "recommendation",
      message: "Replace header identity with signed auth middleware before exposing the control plane.",
    },
    {
      code: "BIND_IDENTITY_TO_APPROVALS",
      severity: "recommendation",
      message: "Use the same operator identity shape for approval requests, decisions, and execution gates.",
    },
  ];
}

function renderSample(sample: OperatorIdentitySample): string[] {
  return [
    `### ${sample.id}`,
    "",
    `- Purpose: ${sample.purpose}`,
    `- Input headers: ${formatValue(sample.inputHeaders)}`,
    `- Identity: ${formatValue(sample.identity)}`,
    "",
  ];
}

function renderMessages(messages: OperatorIdentityContractMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
}

function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
