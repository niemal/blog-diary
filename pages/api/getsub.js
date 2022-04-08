import { generateFingerprint, getSubbedMail } from '../../lib/db.js';

export const config = {
    api: {
      externalResolver: true,
    },
};

export default function handler(req, res) {
    getSubbedMail(generateFingerprint(res.socket.remoteAddress), (err, mail) => {
        if (err) {
            res.status(200).json({ error: err });
        } else {
            res.status(200).json({ mail: mail });
        }
    });
}