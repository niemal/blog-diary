import fs from "fs";
import path from "path";
import { marked } from "marked";
import strip from "remove-markdown";
import { addPost } from "./db.js";
import hljs from "highlight.js";

const postsDirectory = path.join(process.cwd(), "posts");
const conf = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "config.json"))
);

export function getBlogPosts() {
  let posts = [];
  let fileNames = fs.readdirSync(postsDirectory);

  fileNames.forEach((name) => {
    let fullpath = `${postsDirectory}/${name}`;
    const lines = fs.readFileSync(fullpath, "UTF-8").split(/\r?\n/);

    let title = name.replaceAll("_", " ");
    title = [...title];
    title[0] = title[0].toUpperCase();
    title = title.join("");

    let id = name.replaceAll("_", "-").toLowerCase();
    let date = fs.statSync(fullpath).birthtime;

    let time =
      date.getDate().toString() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " - " +
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() === 0 ? "00" : date.getMinutes());

    let tags = lines.shift().split(",");

    let banner = "";
    if (lines[0].startsWith("banner:!")) {
      banner = lines.shift().split("banner:!")[1]; // false because not local cdn
    } else if (lines[0].startsWith("banner:")) {
      banner =
        "/blog/_next/image?url=%2Fblog%2Fbanners%2F" +
        lines.shift().split("banner:")[1] +
        "&w=1920&q=100"; // local cdn
    }

    let content = strip(lines.join("\r\n"));
    let desc = content;

    posts.push({
      title: title,
      time: time,
      desc: desc,
      id: id,
      content: content,
      tags: tags,
      banner: banner,
      date: date,
    });
    addPost({
      id: id,
      title: title,
      desc: desc,
      time: time,
      tags: tags,
      banner: banner,
    });
  });

  posts = posts.sort((a, b) => b.date - a.date);
  return {
    posts: posts.map((post) => {
      const { ["date"]: unused, ...postWithoutDate } = post;
      return postWithoutDate;
    }),
    siteUrl: conf.siteUrl,
  };
}

export function getAllPostIds() {
  const names = fs.readdirSync(postsDirectory);
  return names.map((name) => {
    return {
      params: {
        id: name.replaceAll("_", "-"),
      },
    };
  });
}

export function getPostData(id) {
  const fullpath = `${postsDirectory}/${id.replaceAll("-", "_")}`;
  const lines = fs.readFileSync(fullpath, "UTF-8").split(/\r?\n/);

  let title = id.replaceAll("-", " ");
  title = [...title];
  title[0] = title[0].toUpperCase();
  title = title.join("");

  let date = fs.statSync(fullpath).birthtime;

  let time =
    date.getDate().toString() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " - " +
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() === 0 ? "00" : date.getMinutes());

  let tags = lines.shift().split(",");

  let banner = "";
  if (lines[0].startsWith("banner:!")) {
    banner = lines.shift().split("banner:!")[1]; // false because not local cdn
  } else if (lines[0].startsWith("banner:")) {
    banner =
      "/blog/_next/image?url=%2Fblog%2Fbanners%2F" +
      lines.shift().split("banner:")[1] +
      "&w=1920&q=100"; // local cdn
  }

  // let desc = strip(lines.join('\r\n')).substring(0, 70) + ' ...';

  const renderer = {
    heading(text, level) {
      return `<H${level}>${text}</H${level}>`;
    },
    blockquote(quote) {
      if (quote.startsWith("<P>")) {
        quote = quote.replaceAll("<P>", "");
        quote = quote.replaceAll("</P>", "");
        let text = quote.substring(0, quote.indexOf("<"));
        let by = quote.substring(quote.indexOf("<"), quote.length);

        if (text.length < 2) {
          quote = `❝   ${by}❞`;
        } else {
          quote = `❝   ${text}❞${by}`;
        }
      }
      return `<Blockquote>${quote}</Blockquote>`;
    },
    list(body, ordered, start) {
      if (ordered) {
        return `<Ol>${body}</Ol>`;
      }
      return `<Ul>${body}</Ul>`;
    },
    listitem(text, task, checked) {
      return `<Li>${text}</Li>`;
    },
    checkbox(checked) {
      return `<Checkbox type={"checkbox"} ${checked ? "checked" : ""} />`;
    },
    paragraph(text) {
      if (text.startsWith("<PostImage") || text.startsWith("<Blockquote")) {
        return `${text}`;
      }
      return `<P>${text}</P>`;
    },
    strong(text) {
      return `<Strong>${text}</Strong>`;
    },
    em(text) {
      return `<Em>${text}</Em>`;
    },
    link(href, title, text) {
      return `<PostLink href={"${href}"}>${text}</PostLink>`;
    },
    image(href, title, text) {
      return `<PostImage src={"${href}"} title={"${title}"} alt={"${text}"} />`;
    },
    code(code, infostring, escaped) {
      if (infostring) {
        code = hljs.highlight(code, { language: infostring }).value;

        code = code.replaceAll("{", "&#123;");
        code = code.replaceAll("}", "&#125;");
        code = code.replaceAll("(", "&#40;");
        code = code.replaceAll(")", "&#41;");

        return `<pre><Code className={"hljs"}>${code}</Code></pre>`;
      }
    },
  };

  marked.use({ renderer });
  let markdown = lines.join("\r\n");
  let content = marked.parse(markdown);
  content = content.replaceAll("<code>", '<InlineCode className={"hljs"}>');
  content = content.replaceAll("</code>", "</InlineCode>");

  return {
    post: {
      id: id,
      title: title,
      time: time,
      tags: tags,
      banner: banner,
      content: content,
      //desc: desc,
    },
    siteUrl: conf.siteUrl,
  };
}
