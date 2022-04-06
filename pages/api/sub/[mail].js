import { subscribe, generateFingerprint } from '../../../lib/db.js';

export default function handler(req, res) {
    const { mail } = req.query;

    if (mail.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)?.length === 1) {
        let result = subscribe(
            mail,
            generateFingerprint(res.socket.remoteAddress),
        (err, mail) => {
            console.log('sub served');
            if (err) {
                res.status(200).json({ error: err });
            } else {
                res.status(200).json({ mail: mail });
            }
        });
    } else {
        res.status(200).json({ invalid: true });
    }
}