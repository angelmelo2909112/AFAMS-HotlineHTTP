import { parse } from "querystring"

global.activeServers ||= {}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed")
  }

  const body =
    typeof req.body === "string"
      ? parse(req.body)
      : req.body || {}

  const serverId = body.serverId

  if (!serverId) {
    return res.status(400).send("serverId required")
  }

  let code
  do {
    code = Math.floor(100 + Math.random() * 900).toString()
  } while (global.activeServers[code])

  global.activeServers[code] = serverId

  res.status(200).json({ code })
}
