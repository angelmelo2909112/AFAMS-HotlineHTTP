import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("Method not allowed");

  const { code } = req.query;

  if (!code) return res.status(400).send("code required");

  const { data, error } = await supabase
    .from("server_codes")
    .select("server_id, triggered")
    .eq("code", code)
    .single();

  if (error || !data || !data.triggered) {
    return res.status(200).json({ active_server: null });
  }

  res.status(200).json({
    active_server: data.server_id
  });
}
