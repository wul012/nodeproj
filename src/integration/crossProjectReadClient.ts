const WRITE_HTTP_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const CAPSTONE_JAVA_READ_ROUTES = [
  {
    clientMethod: "health",
    method: "GET",
    path: "/actuator/health",
  },
  {
    clientMethod: "opsEvidence",
    method: "GET",
    path: "/api/v1/ops/evidence",
  },
] as const;

export interface JsonHttpResponse {
  statusCode: number;
  data: unknown;
}

export interface CapstoneRouteCensus {
  client_name: "CrossProjectReadClient";
  public_methods: string[];
  route_count: number;
  read_route_count: number;
  write_route_count: number;
  routes: Array<{
    client_method: string;
    method: string;
    path: string;
  }>;
}

export class CrossProjectReadClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs: number,
  ) {}

  health(): Promise<JsonHttpResponse> {
    return getJson(this.baseUrl, CAPSTONE_JAVA_READ_ROUTES[0].path, this.timeoutMs);
  }

  opsEvidence(): Promise<JsonHttpResponse> {
    return getJson(this.baseUrl, CAPSTONE_JAVA_READ_ROUTES[1].path, this.timeoutMs);
  }
}

export function buildCapstoneRouteCensus(): CapstoneRouteCensus {
  const publicMethods = Object.getOwnPropertyNames(CrossProjectReadClient.prototype)
    .filter((name) => name !== "constructor")
    .sort();
  const routes = CAPSTONE_JAVA_READ_ROUTES.map((route) => ({
    client_method: route.clientMethod,
    method: route.method,
    path: route.path,
  }));

  return {
    client_name: "CrossProjectReadClient",
    public_methods: publicMethods,
    route_count: routes.length,
    read_route_count: routes.filter((route) => route.method === "GET").length,
    write_route_count: routes.filter((route) => WRITE_HTTP_METHODS.has(route.method)).length,
    routes,
  };
}

async function getJson(baseUrl: string, path: string, timeoutMs: number): Promise<JsonHttpResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    const body = await response.text();
    const data = parseJson(body);
    if (!response.ok) {
      throw new Error(`GET ${path} returned HTTP ${response.status}`);
    }
    return { statusCode: response.status, data };
  } finally {
    clearTimeout(timeout);
  }
}

function parseJson(body: string): unknown {
  try {
    return JSON.parse(body);
  } catch {
    throw new Error("upstream response was not valid JSON");
  }
}
