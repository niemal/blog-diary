import { unsubscribe, generateFingerprint } from "../../../lib/db.js";

export default function handler(req, res) {
  let headers = req.rawHeaders.map((h) => h.toLowerCase());
  let userAgent = headers[headers.indexOf("user-agent") + 1];

  unsubscribe(generateFingerprint(userAgent + res.socket.remoteAddress));

  res.status(200).json({ done: true });
}
