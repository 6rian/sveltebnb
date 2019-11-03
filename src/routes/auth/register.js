export const post = (req, res) => {
  console.log(req.body)
  res.end('POST request received correctly')
}
