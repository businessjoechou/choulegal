const {
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
} = require("./_choucounsel-utils");

const HASH_PATTERN = /^[a-f0-9]{64}$/;
const MAX_SNAPSHOT_BYTES = 2_000_000;
const MAX_MANIFEST_BYTES = 20_000;

function assertRecord(value, message) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
  return value;
}

function assertPayloadSize(value, limit, message) {
  const size = Buffer.byteLength(JSON.stringify(value || {}));
  if (size > limit) {
    const error = new Error(message);
    error.status = 413;
    throw error;
  }
  return size;
}

function assertIntegrity(snapshot, integritySha256) {
  const hash = String(integritySha256 || "").trim();
  if (!HASH_PATTERN.test(hash)) {
    const error = new Error("integrity_hash_invalid");
    error.status = 400;
    throw error;
  }
  const actual = sha256Hex(stableStringify(snapshot));
  if (actual !== hash) {
    const error = new Error("integrity_hash_mismatch");
    error.status = 400;
    throw error;
  }
  return hash;
}

function workspaceIdFromRequest(req, body = {}) {
  const url = new URL(req.url || "/", "https://choulegal.com");
  return assertUuid(body.workspaceId || url.searchParams.get("workspaceId"));
}

async function getLatestSnapshot(req, res) {
  const workspaceId = workspaceIdFromRequest(req);
  const { user } = await getUserFromRequest(req);
  await requireWorkspaceMember(workspaceId, user.id);
  requireRateLimit(`choucounsel-snapshot:get:${workspaceId}:${user.id}`, 120, 60 * 1000);

  const query = new URLSearchParams({
    select: "id,workspace_id,snapshot,manifest,integrity_sha256,saved_at,saved_by",
    workspace_id: `eq.${workspaceId}`,
    order: "saved_at.desc",
    limit: "1"
  });
  const rows = await supabaseFetch(`/rest/v1/choucounsel_workspace_snapshots?${query}`);
  json(res, 200, {
    ok: true,
    snapshot: rows?.[0] || null
  });
}

async function saveSnapshot(req, res) {
  const body = await readJson(req);
  const workspaceId = workspaceIdFromRequest(req, body);
  const snapshot = assertRecord(body.snapshot, "snapshot_required");
  const manifest = body.manifest && typeof body.manifest === "object" && !Array.isArray(body.manifest)
    ? body.manifest
    : {};
  assertPayloadSize(snapshot, MAX_SNAPSHOT_BYTES, "snapshot_too_large");
  assertPayloadSize(manifest, MAX_MANIFEST_BYTES, "manifest_too_large");
  const integritySha256 = assertIntegrity(snapshot, body.integritySha256);

  const { user } = await getUserFromRequest(req);
  await requireWorkspaceMember(workspaceId, user.id);
  requireRateLimit(`choucounsel-snapshot:post:${workspaceId}:${user.id}`, 30, 60 * 1000);

  const inserted = await supabaseFetch("/rest/v1/choucounsel_workspace_snapshots", {
    method: "POST",
    headers: { prefer: "return=representation" },
    body: JSON.stringify({
      workspace_id: workspaceId,
      snapshot,
      manifest,
      integrity_sha256: integritySha256,
      saved_by: user.id
    })
  });

  await supabaseFetch("/rest/v1/choucounsel_audit_logs", {
    method: "POST",
    body: JSON.stringify({
      workspace_id: workspaceId,
      actor_id: user.id,
      action: "snapshot.saved",
      target: inserted?.[0]?.id || "",
      metadata: {
        integrity_sha256: integritySha256,
        snapshot_bytes: Buffer.byteLength(JSON.stringify(snapshot)),
        manifest_bytes: Buffer.byteLength(JSON.stringify(manifest))
      }
    })
  });

  json(res, 200, {
    ok: true,
    snapshotId: inserted?.[0]?.id || null,
    savedAt: inserted?.[0]?.saved_at || null
  });
}

module.exports = async function handler(req, res) {
  if (!method(req, res, ["GET", "POST"])) return;

  try {
    requireAllowedOrigin(req);
    if (req.method === "GET") await getLatestSnapshot(req, res);
    else await saveSnapshot(req, res);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports._private = {
  assertIntegrity,
  assertPayloadSize
};
