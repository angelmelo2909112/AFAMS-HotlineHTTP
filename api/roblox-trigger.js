import { createClient } from "@supabase/supabase-js";
import { parse } from "querystring";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const body = typeof req.body === "string" ? parse(req.body) : req.body;
  const code = body.server_code;
  if (!code) return res.status(400).send("server_code required");

  const { data, error } = await supabase
    .from("server_codes")
    .select("server_id")
    .eq("code", code)
    .single();

  if (error || !data) return res.status(400).send("Invalid code");

  await supabase
    .from("server_codes")
    .update({ triggered: true })
    .eq("code", code);

  res.status(200).json({ success: true, serverId: data.server_id });
}
