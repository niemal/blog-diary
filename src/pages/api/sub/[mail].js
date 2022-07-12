import { subscribe, generateFingerprint } from "../../../../lib/db.js";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  const { mail } = req.query;

  let headers = req.rawHeaders.map((h) => h.toLowerCase());
  let userAgent = headers[headers.indexOf("user-agent") + 1];

  if (
    mail.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )?.length === 1
  ) {
    let result = subscribe(
      mail,
      generateFingerprint(userAgent + res.socket.remoteAddress),
      (err, mail) => {
        console.log("sub served");
        if (err) {
          res.status(200).json({ error: err });
        } else if (mail === "exists") {
          res.status(200).json({ exists: true });
        } else {
          res.status(200).json({ mail: mail });
        }
      }
    );
  } else {
    res.status(200).json({ invalid: true });
  }
}
