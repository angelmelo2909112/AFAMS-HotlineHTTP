global.codeOwners ||= {}
global.activeTriggers ||= {}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method not allowed")

  const { serverId } = req.body
  if (!serverId) return res.status(400).send("serverId required")

  let code
  do {
    code = Math.floor(10 + Math.random() * 990).toString().padStart(3,'0')
  } while (global.codeOwners[code])

  global.codeOwners[code] = serverId

  res.status(200).json({ code })
}
