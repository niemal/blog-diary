import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import strip from 'remove-markdown';
import styles from '../styles/Posts.module.css';
import { addPost } from './db.js';
import hljs from 'highlight.js';

const postsDirectory = path.join(process.cwd(), 'posts')
const conf = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json')));

export function getBlogPosts() {
    let posts = [];
    let fileNames = fs.readdirSync(postsDirectory);

    fileNames.forEach(name => {
        let fullpath = `${postsDirectory}/${name}`;
        const lines = fs.readFileSync(fullpath, 'UTF-8').split(/\r?\n/);

        let title = name.replaceAll('_', ' ');
        title = [...title];
        title[0] = title[0].toUpperCase();
        title = title.join('');

        let id = name.replaceAll('_', '-').toLowerCase();
        let date = fs.statSync(fullpath).birthtime;

        let time = date.getDate().toString() + 
        '/' + (date.getMonth() + 1) + 
        '/' + date.getFullYear() +
        ' - ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' + (date.getMinutes() === 0 ? '00' : date.getMinutes());

        let tags = lines.shift().split(',');

        let banner = '';
        if (lines[0].startsWith('banner:!')) {
            banner = lines.shift().split('banner:!')[1]; // false because not local cdn
        } else if (lines[0].startsWith('banner:')) {
            banner = '/_next/image?url=%2Fbanners%2F'
                + lines.shift().split('banner:')[1]
                + '&w=1920&q=100'; // local cdn
        }

        let content = strip(lines.join('\r\n'));
        let desc = content.substring(0, 70) + ' ...';

        posts.push({
            title: title,
            time: time,
            desc: desc,
            id: id,
            content: content,
            tags: tags,
            banner: banner,
            date: date
        });
        addPost({
            id: id,
            title: title,
            desc: desc,
            time: time,
            tags: tags,
            banner: banner
        });
    });

    posts = posts.sort((a, b) => b.date-a.date);
    return {
        posts: posts.map((post) => {
            const { ['date']: unused, ...postWithoutDate } = post;
            return postWithoutDate;
        }),
        siteUrl: conf.siteUrl
    }
}

export function getAllPostIds() {
    const names = fs.readdirSync(postsDirectory);
    return names.map((name) => {
        return {
            params: {
                id: name.replaceAll('_', '-')
            }
        }
    })
}

export function getPostData(id) {
    const fullpath = `${postsDirectory}/${id.replaceAll('-', '_')}`;
    const lines = fs.readFileSync(fullpath, 'UTF-8').split(/\r?\n/);

    let title = id.replaceAll('-', ' ');
    title = [...title];
    title[0] = title[0].toUpperCase();
    title = title.join('');

    let date = fs.statSync(fullpath).birthtime;
   
    let time = date.getDate().toString() + 
    '/' + (date.getMonth() + 1) + 
    '/' + date.getFullYear() +
    ' - ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' + (date.getMinutes() === 0 ? '00' : date.getMinutes());
    
    let tags = lines.shift().split(',');
    
    let banner = '';
    if (lines[0].startsWith('banner:!')) {
        banner = lines.shift().split('banner:!')[1]; // false because not local cdn
    } else if (lines[0].startsWith('banner:')) {
        banner = '/_next/image?url=%2Fbanners%2F'
            + lines.shift().split('banner:')[1]
            + '&w=1920&q=100'; // local cdn
    }

    let content = marked.parse(lines.join('\r\n'));
    let codes = content.match(/(?<=\<code).*?(?=\<\/code\>)/gs);

    if (codes !== null) {
        for (let i = 0; i < codes.length; i++) {
            let lang = content.match(/(?<=language\-).*?(?=\>)/gs);

            if (lang !== null) {
                let codeLang = lang[0].substring(0, lang[0].length-1);
                let tmp = [...codes[i]].join('');

                codes[i] = codes[i].replaceAll('&lt;', '<');
                codes[i] = codes[i].replaceAll('&gt;', '>');
                codes[i] = codes[i].replaceAll('&quot;', '"');
                codes[i] = codes[i].replaceAll('&#39;', "'");

                let val = codes[i].substring(
                    codes[i].indexOf(`language-${codeLang}"`) + `language-${lang[0]}"`.length,
                    codes[i].length
                );
                content = content.replaceAll(
                    `<code${tmp}</code>`,
                    `<code>${hljs.highlight(val, {language: codeLang}).value}</code>`
                );
            }
            
        }
    }

    content = content.replaceAll('<p', `<p class="paragraph text-md lg:text-xl font-light text-white mb-4 mt-2" `);
    content = content.replaceAll('<h1', `<h1 class="text-3xl lg:text-5xl font-bold text-white mb-2 mt-8 lg:mb-6 pt-3" `);
    content = content.replaceAll('<h2', `<h2 class="text-2xl lg:text-4xl font-bold text-white mb-2 mt-10 lg:mb-6 pt-3" `);
    content = content.replaceAll('<ol', `<ol class="text-md lg:text-xl font-light text-white lg:mb-3 mt-2" `);
    content = content.replaceAll('<li', `<li class="pl-2" `);
    content = content.replaceAll('<ul', `<ul class="text-md lg:text-xl font-light text-white lg:mb-3 mt-2" `);
    content = content.replaceAll('<code', `<pre class="${styles.preCode}"><code class="hljs"`);

    return {
        post: {
            id: id,
            title: title,
            time: time,
            tags: tags,
            banner: banner,
            content: content
        },
        siteUrl: conf.siteUrl
    }
}
