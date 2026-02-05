const express = require('express')
const app = express()
app.use(express.json())

let activeServers = {}

function generateCode() {
  let code
  do {
    code = Math.floor(10 + Math.random() * 990).toString().padStart(3, '0')
  } while (activeServers[code])
  return code
}

app.post('/request-code', (req, res) => {
  const serverId = req.body.serverId
  if (!serverId) return res.status(400).send("serverId required")
  const code = generateCode()
  activeServers[code] = serverId
  res.json({ code })
})

app.post('/release-code', (req, res) => {
  const code = req.body.code
  if (!code || !activeServers[code]) return res.status(400).send("Invalid code")
  delete activeServers[code]
  res.json({ status: "ok" })
})

app.get('/roblox-status/:code', (req, res) => {
  const code = req.params.code
  const serverId = activeServers[code] || null
  res.json({ active_server: serverId })
})

app.post('/roblox-trigger', (req, res) => {
  const code = req.body.server_code
  if (!/^\d{3}$/.test(code)) return res.status(400).send("Invalid server code")
  const serverId = activeServers[code]
  if (!serverId) return res.status(403).send("Server not active")
  res.json({ status: "ok", active_server: serverId })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
