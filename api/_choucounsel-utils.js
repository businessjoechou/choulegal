const crypto = require("crypto");

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const rateLimitBuckets = new Map();

function env(name) {
  const value = process.env[name];
  if (!value) throw new Error(`missing_env:${name}`);
  return value;
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}

function method(req, res, allowed) {
  if (!allowed.includes(req.method)) {
    res.setHeader("allow", allowed.join(", "));
    json(res, 405, { error: "method_not_allowed" });
    return false;
  }
  return true;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_200_000) {
        reject(new Error("body_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function supabaseHeaders(serviceRole = true) {
  const key = serviceRole ? env("SUPABASE_SERVICE_ROLE_KEY") : env("SUPABASE_ANON_KEY");
  return {
    apikey: key,
    authorization: `Bearer ${key}`,
    "content-type": "application/json"
  };
}

async function supabaseFetch(path, options = {}) {
  const base = env("SUPABASE_URL").replace(/\/$/, "");
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      ...supabaseHeaders(options.serviceRole !== false),
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.message || data?.error || `supabase_${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

async function getUserFromRequest(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    const error = new Error("not_authenticated");
    error.status = 401;
    throw error;
  }

  const base = env("SUPABASE_URL").replace(/\/$/, "");
  const response = await fetch(`${base}/auth/v1/user`, {
    headers: {
      apikey: env("SUPABASE_ANON_KEY"),
      authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok || !data?.id) {
    const error = new Error("invalid_session");
    error.status = 401;
    throw error;
  }
  return { user: data, token };
}

function assertUuid(value, message = "workspace_id_invalid") {
  const text = String(value || "").trim();
  if (!UUID_PATTERN.test(text)) {
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
  return text;
}

async function requireWorkspaceMember(workspaceId, accountId) {
  const safeWorkspaceId = assertUuid(workspaceId);
  const query = new URLSearchParams({
    select: "role,status",
    workspace_id: `eq.${safeWorkspaceId}`,
    account_id: `eq.${accountId}`,
    status: "eq.active",
    limit: "1"
  });
  const rows = await supabaseFetch(`/rest/v1/choucounsel_workspace_members?${query}`);
  const role = rows?.[0]?.role;
  if (!role) {
    const error = new Error("workspace_member_required");
    error.status = 403;
    throw error;
  }
  return role;
}

function allowedOrigins() {
  const configured = (process.env.CHOUCOUNSEL_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set([
    "https://choulegal.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ...configured
  ]);
}

function requireAllowedOrigin(req) {
  const origin = req.headers.origin || "";
  if (!origin) return;
  if (!allowedOrigins().has(origin)) {
    const error = new Error("origin_not_allowed");
    error.status = 403;
    throw error;
  }
}

function requireRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (bucket.count >= limit) {
    const error = new Error("rate_limited");
    error.status = 429;
    throw error;
  }
  bucket.count += 1;
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256Hex(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function handleError(res, error) {
  const status = error.status && Number.isInteger(error.status) ? error.status : 500;
  json(res, status, {
    error: error.message || "server_error"
  });
}

module.exports = {
  assertUuid,
  getUserFromRequest,
  handleError,
  json,
  method,
  readJson,
  requireAllowedOrigin,
  requireRateLimit,
  requireWorkspaceMember,
  sha256Hex,
  stableStringify,
  supabaseFetch
};
