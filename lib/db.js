import sqlite3 from 'sqlite3';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import 'dotenv/config';

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
    //console.log('db init');
});


//console.log('runnn');
const mailConf = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json')));
mailConf.auth.pass = process.env.BLOG_DIARY_PW;

const transporter = nodemailer.createTransport(mailConf);

export function generateFingerprint(token) {
    const hasher = crypto.createHmac('sha256', 'aliceinwonderland:)(:'); // salt
    return hasher.update(token).digest('hex');
}

export function subscribe(mail, fingerprint, callback) {
    //console.log('subbing');
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO subs(fingerprint, mail, time) VALUES(?, ?, ?)`, [fingerprint, mail, new Date().getTime()]);
        db.get(`SELECT mail FROM subs WHERE fingerprint = ?`, [fingerprint], (err, row) => {
            if (err) {
                callback(err, null);
            } else if (row?.mail === undefined) {
                callback(null, 'exists');
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
        banner = `<div style="text-align: center; border-radius: 7px; width: 80%; height: 30vh; background-position: 50% 50%; background-repeat: no-repeat; background-size: cover; background-image: url('${post.banner}'); margin-bottom: 10px;" class="mx-auto"></div>`;
    }

    let tags = [];
    for (let i = 0; i < post.tags.length; i++) {
        if (i === post.tags.length-1) {
            tags.push(`<span class="inline-block tag">${post.tags[i]}</span>`);
        } else {
            tags.push(`<span class="inline-block tag">${post.tags[i]} - </span>`);
        }
    }
    tags = tags.join('');

    const html = `
    <!doctype html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <head>
        <style>
            /* cyrillic-ext */
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKcg72j00.woff2) format('woff2');
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
            }
            /* cyrillic */
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKew72j00.woff2) format('woff2');
              unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            /* greek-ext */
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKcw72j00.woff2) format('woff2');
              unicode-range: U+1F00-1FFF;
            }
            /* greek */
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKfA72j00.woff2) format('woff2');
              unicode-range: U+0370-03FF;
            }
            /* latin-ext */
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKcQ72j00.woff2) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKfw72.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            html {
              font-family: 'Ubuntu';
            }
            @media screen and (max-width: 926px) {
                #container {
                    margin-left: 15px;
                    margin-right: 15px;
                    margin-top: 10px;
                }
            }
            @media screen and (min-width: 1024px) {
                .lg:text-3xl {
                    font-size: 30px;
                    line-height: 35px;
                }
                .lg:mb-4 {
                    margin-bottom: 16px;
                }
            }
            .blog-block {
                background-color: rgb(55,150,255);
                border-radius: 7px;
            }
            .tag {
                border: 1px solid #ffffff;
                background-color: rgb(0 128 255);
                color: #ffffff;
                padding: 4px;
                margin-right: 5px;
                margin-bottom: 5px;
            }
            .mx-auto {
                margin-left: auto;
                margin-right: auto;
            }
            .mb-8 {
                margin-bottom: 32px;
            }
            .block {
                display: block;
            }
            .mt-4 {
                margin-top: 16px;
            }
            .ml-8 {
                margin-left: 32px;
            }
            .mr-8 {
                margin-right: 32px;
            }
            .text-2xl {
                font-size: 24px;
                line-height: 32px;
            }
            .font-bold {
                font-weight: 700;
            }
            .text-white {
                color: rgb(255 255 255);
            }
            .mb-2 {
                margin-bottom: 8px;
            }
            .date {
                color: rgb(60, 60, 77);
                font-size: 16px;
                width: 40%;
            }
            .ml-2 {
                margin-left: 8px;
            }
            .inline-block {
                display: inline-block;
            }
            .ml-1 {
                margin-left: 4px;
            }
            .mb-4 {
                margin-bottom: 16px;
            }
        </style>
        </head>
        <body>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; padding:0; margin:0px;">
                <tr valign="top">
                    <td align="center">
                        <a style="text-decoration: none" href="${mailConf.siteUrl}/posts/${post.id}">
                            <div class="blog-block mb-8">
                                <div id="container" class="block mt-4 ml-8 mr-8">
                                    <h1 style="text-align: center; padding-top: 20px" class="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4">${post.title}</h1>
                
                                    ${banner}
                
                                    <div style="text-align: center;" class="date mb-2 ml-2 font-bold block">
                                        <img src="${mailConf.siteUrl}/_next/image?url=%2Fclock.svg&w=1920&q=100" class="inline-block" width="20px" height="18px" />
                                        <span class="date ml-1 font-bold inline-block">${post.time}</span>
                                    </div>
                                    <div style="text-align: center;" class="mb-8 text-white">${post.desc}</div>
                                    <div style="text-align: center; padding-bottom: 10px" class="mb-4">
                                        ${tags}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </td>
                </tr>
            </table>
        </body>
    </html>
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
    db.get(`SELECT COUNT(*) AS n FROM posts WHERE id = ?`, [post.id], (err, row) => {
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

export function getSubbedMail(fingerprint, callback) {
    db.get(`SELECT mail FROM subs WHERE fingerprint = ?`, [fingerprint], (err, row) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else if (row?.mail !== undefined) {
            callback(null, row.mail);
        } else {
            callback(null, '');
        }
    });
}