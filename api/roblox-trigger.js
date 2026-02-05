import { parse } from "querystring"

global.activeTriggers ||= {}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed")
  }

  const body =
    typeof req.body === "string"
      ? parse(req.body)
      : req.body || {}

  const code = body.server_code

  if (!code || !global.activeServers?.[code]) {
    return res.status(400).send("Invalid code")
  }

  global.activeTriggers[code] = true

  res.status(200).json({
    success: true,
    serverId: global.activeServers[code]
  })
}
