export const DEFAULT_AIPROJ_SCHEMA_ID = "publication_receipt_v1";

const REGISTRY_SCOPE = "cards_and_publication_receipts";
const ALLOWED_TYPE_NAMES = new Set([
  "dict",
  "list",
  "str",
  "int",
  "float",
  "bool",
  "none",
]);

export const NO_PROMOTION_EXPECTATIONS: Readonly<Record<string, unknown>> = {
  "summary.granted_use": "downstream_governance_lookup_only",
  "summary.promotion_ready": false,
  "summary.approved_for_promotion": false,
  "receipt.granted_use": "downstream_governance_lookup_only",
  "receipt.promotion_ready": false,
  "receipt.approved_for_promotion": false,
};

export interface AiprojArtifactSchemaSelection {
  registrySchemaVersion: number;
  registryScope: string;
  schemaId: string;
  artifactKind: string;
  artifactPath: string;
  registeredArtifactCount: number;
  requiredFields: string[];
  expectedValues: Record<string, unknown>;
  typeChecks: Record<string, string>;
}

export interface AiprojArtifactContractValidation {
  passed: boolean;
  requiredFieldCount: number;
  missingFields: string[];
  expectedValueCount: number;
  expectedValueMismatches: AiprojValueMismatch[];
  typeCheckCount: number;
  typeMismatches: AiprojTypeMismatch[];
}

export interface AiprojValueMismatch {
  field: string;
  expected: unknown;
  actual: unknown;
}

export interface AiprojTypeMismatch {
  field: string;
  expected: string;
  actual: string;
}

export interface AiprojNoPromotionValidation {
  passed: boolean;
  registryRuleMismatches: AiprojValueMismatch[];
  artifactValueMismatches: AiprojValueMismatch[];
  grantedUse: unknown;
  promotionReady: unknown;
  approvedForPromotion: unknown;
}

export function selectAiprojArtifactSchema(
  registryValue: unknown,
  schemaId = DEFAULT_AIPROJ_SCHEMA_ID,
): AiprojArtifactSchemaSelection {
  const registry = requireRecord(registryValue, "registry must be a JSON object");
  if (registry.schema_version !== 1) {
    throw new Error(`registry schema_version must be 1, received ${describeValue(registry.schema_version)}`);
  }
  if (registry.scope !== REGISTRY_SCOPE) {
    throw new Error(`registry scope must be ${REGISTRY_SCOPE}, received ${describeValue(registry.scope)}`);
  }

  const schemas = requireRecordArray(registry.schemas, "registry schemas must be a non-empty object array");
  if (schemas.length === 0) {
    throw new Error("registry schemas must be a non-empty object array");
  }
  const schemaIds = schemas.map((schema) => requireNonEmptyString(schema.schema_id, "schema_id"));
  if (new Set(schemaIds).size !== schemaIds.length) {
    throw new Error("registry schema_id values must be unique");
  }

  const selectedIndex = schemaIds.indexOf(schemaId);
  if (selectedIndex < 0) {
    throw new Error(`registry does not contain schema_id ${schemaId}`);
  }
  const schema = schemas[selectedIndex];
  const artifactPaths = requireStringArray(schema.artifact_paths, "artifact_paths", true);
  const requiredFields = requireStringArray(schema.required_fields, "required_fields", true);
  if (new Set(requiredFields).size !== requiredFields.length) {
    throw new Error(`schema ${schemaId} required_fields must be unique`);
  }

  const expectedValues = requireRecord(schema.expected_values, `schema ${schemaId} expected_values must be an object`);
  const rawTypeChecks = requireRecord(schema.type_checks, `schema ${schemaId} type_checks must be an object`);
  const typeChecks: Record<string, string> = {};
  for (const [field, rawType] of Object.entries(rawTypeChecks)) {
    const typeName = requireNonEmptyString(rawType, `type_checks.${field}`);
    if (!ALLOWED_TYPE_NAMES.has(typeName)) {
      throw new Error(`schema ${schemaId} type_checks.${field} uses unsupported type ${typeName}`);
    }
    typeChecks[field] = typeName;
  }

  return {
    registrySchemaVersion: 1,
    registryScope: REGISTRY_SCOPE,
    schemaId,
    artifactKind: requireNonEmptyString(schema.artifact_kind, "artifact_kind"),
    artifactPath: artifactPaths[0],
    registeredArtifactCount: artifactPaths.length,
    requiredFields,
    expectedValues,
    typeChecks,
  };
}

export function validateAiprojArtifactContract(
  artifactValue: unknown,
  selection: AiprojArtifactSchemaSelection,
): AiprojArtifactContractValidation {
  const artifact = requireRecord(artifactValue, "registered artifact must be a JSON object");
  const missingFields = selection.requiredFields.filter((field) => !lookupNestedValue(artifact, field).present);
  const expectedValueMismatches = Object.entries(selection.expectedValues)
    .map(([field, expected]) => valueMismatch(artifact, field, expected))
    .filter((value): value is AiprojValueMismatch => value !== null);
  const typeMismatches = Object.entries(selection.typeChecks)
    .map(([field, expected]) => typeMismatch(artifact, field, expected))
    .filter((value): value is AiprojTypeMismatch => value !== null);

  return {
    passed: missingFields.length === 0
      && expectedValueMismatches.length === 0
      && typeMismatches.length === 0,
    requiredFieldCount: selection.requiredFields.length,
    missingFields,
    expectedValueCount: Object.keys(selection.expectedValues).length,
    expectedValueMismatches,
    typeCheckCount: Object.keys(selection.typeChecks).length,
    typeMismatches,
  };
}

export function validateAiprojNoPromotionBoundary(
  artifactValue: unknown,
  selection: AiprojArtifactSchemaSelection,
): AiprojNoPromotionValidation {
  const artifact = requireRecord(artifactValue, "registered artifact must be a JSON object");
  const registryRuleMismatches = Object.entries(NO_PROMOTION_EXPECTATIONS)
    .map(([field, expected]) => directValueMismatch(selection.expectedValues, field, expected))
    .filter((value): value is AiprojValueMismatch => value !== null);
  const artifactValueMismatches = Object.entries(NO_PROMOTION_EXPECTATIONS)
    .map(([field, expected]) => valueMismatch(artifact, field, expected))
    .filter((value): value is AiprojValueMismatch => value !== null);

  return {
    passed: registryRuleMismatches.length === 0 && artifactValueMismatches.length === 0,
    registryRuleMismatches,
    artifactValueMismatches,
    grantedUse: lookupNestedValue(artifact, "summary.granted_use").value ?? null,
    promotionReady: lookupNestedValue(artifact, "summary.promotion_ready").value ?? null,
    approvedForPromotion: lookupNestedValue(artifact, "summary.approved_for_promotion").value ?? null,
  };
}

function valueMismatch(
  object: Record<string, unknown>,
  field: string,
  expected: unknown,
): AiprojValueMismatch | null {
  const actual = lookupNestedValue(object, field);
  return actual.present && valuesEqual(actual.value, expected)
    ? null
    : { field, expected, actual: actual.value ?? null };
}

function directValueMismatch(
  object: Record<string, unknown>,
  field: string,
  expected: unknown,
): AiprojValueMismatch | null {
  const present = Object.hasOwn(object, field) && object[field] !== null;
  return present && valuesEqual(object[field], expected)
    ? null
    : { field, expected, actual: object[field] ?? null };
}

function typeMismatch(
  object: Record<string, unknown>,
  field: string,
  expected: string,
): AiprojTypeMismatch | null {
  const actual = artifactTypeName(lookupNestedValue(object, field).value);
  return actual === expected ? null : { field, expected, actual };
}

function lookupNestedValue(
  object: Record<string, unknown>,
  dottedField: string,
): { present: boolean; value: unknown } {
  let value: unknown = object;
  for (const segment of dottedField.split(".")) {
    if (!isRecord(value) || !Object.hasOwn(value, segment)) {
      return { present: false, value: undefined };
    }
    value = value[segment];
  }
  return { present: value !== null && value !== undefined, value };
}

function artifactTypeName(value: unknown): string {
  if (value === null || value === undefined) {
    return "none";
  }
  if (Array.isArray(value)) {
    return "list";
  }
  if (typeof value === "object") {
    return "dict";
  }
  if (typeof value === "string") {
    return "str";
  }
  if (typeof value === "boolean") {
    return "bool";
  }
  if (typeof value === "number") {
    return Number.isInteger(value) ? "int" : "float";
  }
  return typeof value;
}

function valuesEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function requireRecord(value: unknown, message: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(message);
  }
  return value;
}

function requireRecordArray(value: unknown, message: string): Record<string, unknown>[] {
  if (!Array.isArray(value) || !value.every(isRecord)) {
    throw new Error(message);
  }
  return value;
}

function requireStringArray(value: unknown, field: string, nonEmpty: boolean): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && item.trim().length > 0)) {
    throw new Error(`${field} must contain only non-empty strings`);
  }
  if (nonEmpty && value.length === 0) {
    throw new Error(`${field} must be non-empty`);
  }
  return value.map((item) => item.trim());
}

function requireNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} must be a non-empty string`);
  }
  return value.trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function describeValue(value: unknown): string {
  return JSON.stringify(value) ?? String(value);
}
