import { unsubscribe, generateFingerprint } from '../../lib/db.js';

export default function handler(req, res) {
    unsubscribe(
        generateFingerprint(res.getHeader('User-Agent') + res.socket.remoteAddress)
    );
    res.status(200).json({ done: true });
}