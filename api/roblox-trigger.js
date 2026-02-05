let activeServers = global.activeServers || {}
global.activeServers = activeServers

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method not allowed")
  const { server_code } = req.body
  if (!/^\d{3}$/.test(server_code)) return res.status(400).send("Invalid server code")
  const serverId = activeServers[server_code]
  if (!serverId) return res.status(403).send("Server not active")
  res.status(200).json({ status: "ok", active_server: serverId })
}
