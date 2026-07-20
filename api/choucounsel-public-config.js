const { json, method } = require("./_choucounsel-utils");

module.exports = async function handler(req, res) {
  if (!method(req, res, ["GET"])) return;

  json(res, 200, {
    enabled: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    apiBaseUrl: process.env.CHOUCOUNSEL_API_BASE_URL || "",
    authRedirectUrl: process.env.CHOUCOUNSEL_AUTH_REDIRECT_URL || "",
    supabaseSdkUrl: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.110.0",
    note: "ChouCounsel cloud config only reports whether browser sign-in can be enabled; it does not prove production cloud sync has passed live validation."
  });
};
