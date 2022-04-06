import sqlite3 from 'sqlite3';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

sqlite3.verbose();
const db = new sqlite3.Database(path.join(process.cwd(), 'blog.db'));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS subs(
        fingerprint TEXT NOT NULL,
        mail TEXT NOT NULL,
        time INTEGER,
        UNIQUE (fingerprint),
        UNIQUE (mail)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS posts(
        id TEXT NOT NULL,
        time INTEGER,
        UNIQUE (id)
    )`);
    console.log('db init');
});


console.log('runnn');
const mailConf = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'mail_conf.json')));
const transporter = nodemailer.createTransport(mailConf);

export function generateFingerprint(token) {
    const hasher = crypto.createHmac('sha256',  'aliceinwonderland:)(:'); // salt
    return hasher.update(token).digest('hex');
}

export function subscribe(mail, fingerprint, callback) {
    console.log('subbing');
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO subs(fingerprint, mail, time) VALUES(?, ?, ?)`, [fingerprint, mail, new Date().getTime()]);
        db.each(`SELECT mail FROM subs WHERE fingerprint = "${fingerprint}"`, (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row.mail);
            }
        });
    });
}

export function unsubscribe(fingerprint) {
    db.run(`DELETE FROM subs WHERE fingerprint = ?`, fingerprint);
}

function notifyWithPost(post) {
    let banner = '';
    if (post.banner.length > 0) {
        banner = `<div style="width: 100%; height: 20vh; backgroundPosition: '50% 50%'; backgroundSize: 'cover'; backgroundImage: url('${post.banner}'); margin-bottom: 10px;"></div>`;
    }

    let tags = post.tags.map((tag) =>  `<span class="inline-block tag">${tag}</span>`).join('');

    const html = `
    <style>
        @media screen and (max-width: 926px) {
            .blog-block {
                width: 85% !important;
            }
            #container {
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 10px;
            }
        }
        @media screen and (min-width: 1024px) {
            .lg\:text-3xl {
                font-size: 1.875rem;
                line-height: 2.25rem;
            }
            .lg\:mb-4 {
                margin-bottom: 1rem;
            }
        }
        .w-1/4 {
            width: 25%;
        }
        .items-center {
            align-items: center;
        }
        .blog-block {
            border: 2px solid #dadada;
            border-radius: 7px;
            width: 35%;
            background: rgb(55,150,255);
            position: relative;
            right: 0;
            opacity: 0.73;
        }
        .mx-auto {
            margin-left: auto;
            margin-right: auto;
        }
        .mb-8 {
            margin-bottom: 2rem;
        }
        .block {
            display: block;
        }
        .mt-4 {
            margin-top: 1rem;
        }
        .ml-8 {
            margin-left: 2rem;
        }
        .mr-8 {
            margin-right: 2rem;
        }
        .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
        }
        .font-bold {
            font-weight: 700;
        }
        .text-white {
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity));
        }
        .mb-2 {
            margin-bottom: 0.5rem;
        }
        .date {
            color: rgb(60, 60, 77);
            font-size: 1.1rem;
        }
        .ml-2 {
            margin-left: 0.5rem;
        }
        .inline-block {
            display: inline-block;
        }
        .ml-1 {
            margin-left: 0.25rem;
        }
        .mb-4 {
            margin-bottom: 1rem;
        }
    </style>
    <a href="${mailConf.siteUrl}/posts/${post.id}" class="w-1/4 items-center blog-block mx-auto mb-8">
        <div id="container" class="block mx-auto mt-4 ml-8 mr-8">
            <h1 class="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4 mx-auto">${post.title}</h1>
            
            ${banner}

            <div class="date mb-2 ml-2 font-bold inline-block">
                <img src="${mailConf.siteUrl}/_next/image?url=%2Fclock.svg&w=1920&q=100" class="inline-block" width="20px" height="18px" />
                <span class="date ml-1 font-bold inline-block">${post.time}</span>
            </div>
            <div class="mb-8 text-white">${post.desc}</div>
            <div class="mb-4">
                ${tags}
            </div>
        </div>
    </a>
    `;

    db.each(`SELECT mail FROM subs`, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            let message = {
                from: mailConf.auth.user,
                to: row.mail,
                subject: `New post: ${post.title}`,
                html: html
            }

            transporter.sendMail(message, (err, info) => {
                if (err)
                    console.log(err);
                else
                    console.log(info);
            })
        }
    });
}

// If it does not exist, it means it's a new post and a mail must be sent.
export function addPost(post) {
    console.log('adding post');
    db.each(`SELECT COUNT(*) AS n FROM posts WHERE id = "${post.id}"`, (err, row) => {
        if (err) {
            console.log(err);
        } else
        // doesn't exist!
        if (row.n !== 1) {
            db.run(`INSERT INTO posts(id, time) VALUES(?, ?)`, [
                post.id,
                post.time
            ]);
            console.log('[+] New post found, notifying...');
            notifyWithPost(post);
        }
    });
}