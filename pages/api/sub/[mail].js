import { subscribe, generateFingerprint } from '../../../lib/db.js';

export default function handler(req, res) {
    const { mail } = req.query;
    let result = subscribe(
        mail,
        generateFingerprint(res.getHeader('User-Agent') + res.socket.remoteAddress),
    (err, mail) => {
        console.log('sub served');
        if (err) {
            res.status(200).json({ error: err });
        } else {
            res.status(200).json({ mail: mail });
        }
    });
}