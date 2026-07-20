const {
  getUserFromRequest,
  handleError,
  json,
  method,
  requireAllowedOrigin,
  requireRateLimit,
  supabaseFetch
} = require("./_choucounsel-utils");

async function listWorkspaces(req, res) {
  const { user } = await getUserFromRequest(req);
  requireRateLimit(`choucounsel-workspaces:list:${user.id}`, 60, 60 * 1000);

  const memberQuery = new URLSearchParams({
    select: "workspace_id,role,status",
    account_id: `eq.${user.id}`,
    status: "eq.active",
    limit: "25"
  });
  const memberships = await supabaseFetch(`/rest/v1/choucounsel_workspace_members?${memberQuery}`);
  const workspaceIds = [...new Set((memberships || []).map((member) => member.workspace_id).filter(Boolean))];

  if (!workspaceIds.length) {
    json(res, 200, { ok: true, workspaces: [] });
    return;
  }

  const workspaceQuery = new URLSearchParams({
    select: "id,name,firm_name,status,created_at,updated_at",
    id: `in.(${workspaceIds.join(",")})`,
    status: "eq.active",
    limit: "25"
  });
  const workspaces = await supabaseFetch(`/rest/v1/choucounsel_workspaces?${workspaceQuery}`);
  const roleByWorkspace = new Map(memberships.map((member) => [member.workspace_id, member.role]));

  json(res, 200, {
    ok: true,
    workspaces: (workspaces || [])
      .map((workspace) => ({
        id: workspace.id,
        name: workspace.name,
        firmName: workspace.firm_name || "",
        status: workspace.status,
        role: roleByWorkspace.get(workspace.id) || "viewer",
        createdAt: workspace.created_at || "",
        updatedAt: workspace.updated_at || ""
      }))
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
  });
}

module.exports = async function handler(req, res) {
  if (!method(req, res, ["GET"])) return;

  try {
    requireAllowedOrigin(req);
    await listWorkspaces(req, res);
  } catch (error) {
    handleError(res, error);
  }
};
