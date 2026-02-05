const express = require('express');
const app = express();
app.use(express.json());

let activeServers = {};

app.post('/roblox-trigger', (req, res) => {
  const code = req.body.server_code;

  if (!/^\d{3}$/.test(code)) {
    return res.status(400).send("Invalid server code");
  }

  if (activeServers[code]) {
    return res.status(403).send("Server already active");
  }

  activeServers[code] = true;
  console.log(`Server ${code} activated!`);

  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
