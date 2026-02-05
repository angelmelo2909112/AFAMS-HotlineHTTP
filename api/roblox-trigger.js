export default async function handler(req, res) {
  console.log("METHOD:", req.method)
  console.log("HEADERS:", req.headers)
  console.log("BODY:", req.body)
  console.log("QUERY:", req.query)

  return res.status(200).json({
    method: req.method,
    headers: req.headers,
    body: req.body,
    query: req.query
  })
}
