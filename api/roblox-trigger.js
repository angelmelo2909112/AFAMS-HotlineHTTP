import { parse } from "querystring"

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method not allowed")

  let code
  if (req.headers['content-type']?.includes("application/json")) {
    code = req.body.server_code
  } else {
    code = req.body.server_code || parse(req.body || "").server_code
  }

  if (!code || !global.codeOwners?.[code]) {
    return res.status(400).send("Invalid code")
  }

  global.activeTriggers ||= {}
  global.activeTriggers[code] = true

  res.status(200).json({ success: true })
}
