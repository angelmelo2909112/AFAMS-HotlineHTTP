export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const server_code =
    req.body?.server_code ||
    req.body?.Digits ||
    req.query?.server_code

  if (!server_code) {
    return res.status(400).json({ error: "Missing server_code" })
  }

  if (server_code.length !== 3) {
    return res.status(400).json({ error: "Invalid server code length" })
  }

  console.log("SERVER CODE RECEIVED:", server_code)

  return res.status(200).json({
    success: true,
    server_code
  })
}
