import { createClient } from "@supabase/supabase-js";
import { parse } from "querystring";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const body = typeof req.body === "string" ? parse(req.body) : req.body;
  const code = body.code;

  if (!code) return res.status(400).send("code required");

  // Eliminar el código de la base de datos
  const { error } = await supabase
    .from("server_codes")
    .delete()
    .eq("code", code);

  if (error) {
    console.error("Error deleting code:", error);
    return res.status(500).json({ success: false, error: error.message });
  }

  res.status(200).json({ success: true, message: "Code released" });
}
