import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import strip from 'remove-markdown';
import { addPost } from './db.js';

const postsDirectory = path.join(process.cwd(), 'posts')

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
        let desc = content.substr(0, 70) + ' ...';

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
    return posts.map((post) => {
        const { ['date']: unused, ...postWithoutDate } = post;
        return postWithoutDate;
    });
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

    return {
        id: id,
        title: title,
        time: time,
        tags: tags,
        banner: banner,
        content: marked.parse(lines.join('\r\n'))
    }
}
