import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import strip from 'remove-markdown'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getBlogPosts() {
    let posts = [];
    let fileNames = fs.readdirSync(postsDirectory);
    fileNames.forEach(name => {
        let fullpath = `${postsDirectory}/${name}`;
        const lines = fs.readFileSync(fullpath, 'UTF-8').split(/\r?\n/);

        let title = name.replaceAll('_', ' ');
        let id = name.replaceAll('_', '-').toLowerCase();
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
        let content = strip(lines.join('\r\n'));
        let desc = content.substr(0, 70) + ' ...';
        posts.push([title, time, desc, id, content, tags, date]);
    });
    posts = posts.sort((a, b) => b[b.length-1]-a[a.length-1]);
    for (let i = 0; i < posts.length; i++) {
        posts[i].pop();
    }

    return posts;
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
    return {
        id: id,
        title: title,
        time: time,
        tags: tags,
        content: marked.parse(lines.join('\r\n'))
    }
}
