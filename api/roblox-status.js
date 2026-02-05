let activeServers = global.activeServers || {}
global.activeServers = activeServers

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send("Method not allowed")
  const { code } = req.query
  const serverId = activeServers[code] || null
  res.status(200).json({ active_server: serverId })
}
