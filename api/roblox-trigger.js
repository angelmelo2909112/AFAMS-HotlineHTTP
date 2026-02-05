import { parse } from "querystring"

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method not allowed")

  const parsed = parse(req.body?.body || "")
  const code = parsed.server_code

  if (!code || !global.codeOwners?.[code]) {
    return res.status(400).send("Invalid code")
  }

  global.activeTriggers ||= {}
  global.activeTriggers[code] = true

  res.status(200).json({ success: true })
}
