import { createClient } from "@supabase/supabase-js"
import { parse } from "querystring"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed")
  }

  const body =
    typeof req.body === "string"
      ? parse(req.body)
      : req.body

  const serverId = body.serverId
  if (!serverId) {
    return res.status(400).send("serverId required")
  }

  let code
  let exists = true

  while (exists) {
    code = Math.floor(100 + Math.random() * 900).toString()
    const { data } = await supabase
      .from("server_codes")
      .select("code")
      .eq("code", code)
      .single()

    exists = !!data
  }

  await supabase.from("server_codes").insert({
    code,
    server_id: serverId
  })

  res.status(200).json({ code })
}
