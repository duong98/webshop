export default function adaptRequest(req = {}) {
  return Object.freeze({
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    headers: {
      "Content-Type": req.get("Content-Type"),
      Referer: req.get("referer"),
      "User-Agent": req.get("User-Agent")
    }
  });
}
