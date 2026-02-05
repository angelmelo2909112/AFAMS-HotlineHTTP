import { parse } from "querystring"

export default function handler(req, res) {
  const raw = req.body?.body
  const parsed = parse(raw || "")
  const code = parsed.server_code

  if (!code || !global.codeOwners?.[code]) {
    return res.status(400).json({ error: "Invalid code" })
  }

  global.activeTriggers ||= {}
  global.activeTriggers[code] = global.codeOwners[code]

  return res.status(200).json({ success: true })
}
