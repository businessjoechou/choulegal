import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const snapshotHandler = require("./choucounsel-snapshot.js");
const publicConfigHandler = require("./choucounsel-public-config.js");
const workspacesHandler = require("./choucounsel-workspaces.js");

const workspaceId = "123e4567-e89b-42d3-a456-426614174000";
const userId = "223e4567-e89b-42d3-a456-426614174001";
const snapshotId = "323e4567-e89b-42d3-a456-426614174002";

process.env.SUPABASE_URL = "https://example.supabase.co";
process.env.SUPABASE_ANON_KEY = "anon-test";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service-test";

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

function makeReq({ method = "GET", url = "/", headers = {}, body = null } = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = headers;
  process.nextTick(() => {
    if (body !== null) req.emit("data", Buffer.from(JSON.stringify(body)));
    req.emit("end");
  });
  return req;
}

function makeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(value = "") {
      this.body = String(value);
      this.finished = true;
    }
  };
}

async function call(handler, req) {
  const res = makeRes();
  await handler(req, res);
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: res.body ? JSON.parse(res.body) : null
  };
}

function installFetchStub({ membership = true } = {}) {
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    const textResponse = (status, data) => ({
      ok: status >= 200 && status < 300,
      status,
      async text() {
        return data === null ? "" : JSON.stringify(data);
      },
      async json() {
        return data;
      }
    });

    const path = new URL(String(url)).pathname;
    if (path === "/auth/v1/user") {
      const authorization = options.headers?.authorization || "";
      if (authorization === "Bearer valid-token") return textResponse(200, { id: userId, email: "lawyer@example.com" });
      return textResponse(401, { error: "invalid_session" });
    }

    if (String(url).includes("/rest/v1/choucounsel_workspace_members")) {
      return textResponse(200, membership ? [{ workspace_id: workspaceId, role: "lawyer", status: "active" }] : []);
    }

    if (String(url).includes("/rest/v1/choucounsel_workspaces")) {
      return textResponse(200, [{
        id: workspaceId,
        name: "測試雲端工作區",
        firm_name: "測試律所",
        status: "active",
        created_at: "2026-07-19T09:00:00Z",
        updated_at: "2026-07-19T10:00:00Z"
      }]);
    }

    if (String(url).includes("/rest/v1/choucounsel_workspace_snapshots") && options.method === "POST") {
      const body = JSON.parse(options.body);
      return textResponse(201, [{ id: snapshotId, saved_at: "2026-07-19T10:00:00Z", ...body }]);
    }

    if (String(url).includes("/rest/v1/choucounsel_workspace_snapshots")) {
      return textResponse(200, [{
        id: snapshotId,
        workspace_id: workspaceId,
        snapshot: { cases: [] },
        manifest: { caseCount: 0 },
        integrity_sha256: sha256Hex(stableStringify({ cases: [] })),
        saved_at: "2026-07-19T10:00:00Z",
        saved_by: userId
      }]);
    }

    if (String(url).includes("/rest/v1/choucounsel_audit_logs")) {
      return textResponse(201, []);
    }

    return textResponse(404, { error: "unexpected_fetch", url: String(url) });
  };
  return calls;
}

async function runPublicConfigTest() {
  const response = await call(publicConfigHandler, makeReq({ method: "GET" }));
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.enabled, true);
  assert.match(response.body.supabaseSdkUrl, /supabase-js@2\.110\.0/);
}

async function runUnauthorizedTest() {
  installFetchStub();
  const response = await call(snapshotHandler, makeReq({
    method: "GET",
    url: `/api/choucounsel-snapshot?workspaceId=${workspaceId}`,
    headers: { origin: "https://choulegal.com" }
  }));
  assert.equal(response.statusCode, 401);
  assert.equal(response.body.error, "not_authenticated");
}

async function runOriginRejectTest() {
  installFetchStub();
  const response = await call(snapshotHandler, makeReq({
    method: "GET",
    url: `/api/choucounsel-snapshot?workspaceId=${workspaceId}`,
    headers: { origin: "https://evil.example", authorization: "Bearer valid-token" }
  }));
  assert.equal(response.statusCode, 403);
  assert.equal(response.body.error, "origin_not_allowed");
}

async function runNonMemberTest() {
  installFetchStub({ membership: false });
  const response = await call(snapshotHandler, makeReq({
    method: "GET",
    url: `/api/choucounsel-snapshot?workspaceId=${workspaceId}`,
    headers: { origin: "https://choulegal.com", authorization: "Bearer valid-token" }
  }));
  assert.equal(response.statusCode, 403);
  assert.equal(response.body.error, "workspace_member_required");
}

async function runHashMismatchTest() {
  installFetchStub();
  const response = await call(snapshotHandler, makeReq({
    method: "POST",
    url: "/api/choucounsel-snapshot",
    headers: { origin: "https://choulegal.com", authorization: "Bearer valid-token" },
    body: {
      workspaceId,
      snapshot: { cases: [{ id: "case-1", title: "測試案件" }] },
      manifest: { caseCount: 1 },
      integritySha256: sha256Hex("wrong")
    }
  }));
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "integrity_hash_mismatch");
}

async function runSaveAndReadTest() {
  const calls = installFetchStub();
  const snapshot = { cases: [{ id: "case-1", title: "測試案件" }], workspace: { firmName: "測試律所" } };
  const integritySha256 = sha256Hex(stableStringify(snapshot));
  const saveResponse = await call(snapshotHandler, makeReq({
    method: "POST",
    url: "/api/choucounsel-snapshot",
    headers: { origin: "https://choulegal.com", authorization: "Bearer valid-token" },
    body: {
      workspaceId,
      snapshot,
      manifest: { caseCount: 1 },
      integritySha256
    }
  }));
  assert.equal(saveResponse.statusCode, 200);
  assert.equal(saveResponse.body.ok, true);
  assert.equal(saveResponse.body.snapshotId, snapshotId);
  assert.ok(calls.some((call) => call.url.includes("/rest/v1/choucounsel_audit_logs")), "audit log should be written");

  const readResponse = await call(snapshotHandler, makeReq({
    method: "GET",
    url: `/api/choucounsel-snapshot?workspaceId=${workspaceId}`,
    headers: { origin: "https://choulegal.com", authorization: "Bearer valid-token" }
  }));
  assert.equal(readResponse.statusCode, 200);
  assert.equal(readResponse.body.snapshot.id, snapshotId);
}

async function runWorkspaceListTest() {
  installFetchStub();
  const response = await call(workspacesHandler, makeReq({
    method: "GET",
    url: "/api/choucounsel-workspaces",
    headers: { origin: "https://choulegal.com", authorization: "Bearer valid-token" }
  }));
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(response.body.workspaces.length, 1);
  assert.equal(response.body.workspaces[0].id, workspaceId);
  assert.equal(response.body.workspaces[0].role, "lawyer");
  assert.equal(response.body.workspaces[0].firmName, "測試律所");
}

await runPublicConfigTest();
await runUnauthorizedTest();
await runOriginRejectTest();
await runNonMemberTest();
await runHashMismatchTest();
await runSaveAndReadTest();
await runWorkspaceListTest();

console.log("ChouCounsel cloud API verification passed");
