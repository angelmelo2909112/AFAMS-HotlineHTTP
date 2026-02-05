let activeServers = global.activeServers || {}
global.activeServers = activeServers

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method not allowed")

  const { server_code, action } = req.body

  if (!server_code || !action) return res.status(400).json({ error: "Missing server_code or action" })

  const serverId = activeServers[server_code]

  if (!serverId) return res.status(404).json({ error: "Server code not active or invalid" })

  if (action === "activate_script") {
    return res.status(200).json({ success: true, message: `Server ${server_code} activated` })
  }

  return res.status(400).json({ error: "Invalid action" })
}
