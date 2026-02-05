let activeServers = global.activeServers || {}
global.activeServers = activeServers

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method not allowed")
  const { code } = req.body
  if (!code || !activeServers[code]) return res.status(400).send("Invalid code")
  delete activeServers[code]
  res.status(200).json({ status: "ok" })
}
