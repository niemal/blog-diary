import { generateFingerprint, getSubbedMail } from "../../../lib/db.js";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  let headers = req.rawHeaders.map((h) => h.toLowerCase());
  let userAgent = headers[headers.indexOf("user-agent") + 1];

  getSubbedMail(
    generateFingerprint(userAgent + res.socket.remoteAddress),
    (err, mail) => {
      if (err) {
        res.status(200).json({ error: err });
      } else {
        res.status(200).json({ mail: mail });
      }
    }
  );
}
