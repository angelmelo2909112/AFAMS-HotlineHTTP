global.codeOwners ||= {}
global.activeTriggers ||= {}

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send("Method not allowed")

  const { code } = req.query

  if (!global.activeTriggers[code]) {
    return res.status(200).json({ active_server: null })
  }

  res.status(200).json({
    active_server: global.codeOwners[code]
  })
}
