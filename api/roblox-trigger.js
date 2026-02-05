import { parse } from "querystring"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const raw = req.body?.body
  if (!raw) {
    return res.status(400).json({ error: "Empty body" })
  }

  const parsed = parse(raw)
  const code = parsed.server_code

  if (!code || !/^\d{3}$/.test(code) || code === "000" || code === "001") {
    return res.status(400).json({ error: "Invalid server code" })
  }

  global.activeTriggers ||= {}
  global.activeTriggers[code] = true

  return res.status(200).json({ success: true })
}
