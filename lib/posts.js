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
        quote = `❝   ${text}❞${by}`;
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
  };
  marked.use({ renderer });
  let markdown = lines.join("\r\n");
  let content = marked.parse(markdown);
  //content = content.replaceAll("<pre><code", "<code");
  //content = content.replaceAll("</code></pre>", "</code>");
  let codes = content.match(/(?<=\<code).*?(?=\<\/code\>)/gs);

  if (codes !== null) {
    for (let i = 0; i < codes.length; i++) {
      let lang = content.match(/(?<=language\-).*?(?=\>)/gs);

      if (lang !== null) {
        let codeLang = lang[0].substring(0, lang[0].length - 1);
        let tmp = [...codes[i]].join("");

        codes[i] = codes[i].replaceAll("&lt;", "<");
        codes[i] = codes[i].replaceAll("&gt;", ">");
        codes[i] = codes[i].replaceAll("&quot;", '"');
        codes[i] = codes[i].replaceAll("&#39;", "'");
        codes[i] = codes[i].replaceAll("&amp;", "&");

        let val = codes[i].substring(
          codes[i].indexOf(`language-${codeLang}"`) +
            `language-${lang[0]}"`.length,
          codes[i].length
        );

        if (tmp.indexOf(codeLang) === -1 || val === "") {
          //console.log(`tmp: ${tmp}\ncodeLang: ${codeLang}\n#######`);
          content = content.replaceAll(
            `<code${tmp}</code>`,
            `<InlineCode className={"hljs"}>${tmp.substring(
              1,
              tmp.length
            )}</InlineCode>`
          );
          continue;
        }
        // console.log(
        //   `codes[i]: ${codes[i]}\ntmp: ${tmp}\ncodeLang: ${codeLang}\nval: ${val}\n----`
        // );
        content = content.replaceAll(
          `<code${tmp}</code>`,
          `<Code className={"hljs"}>${hljs
            .highlight(val, { language: codeLang })
            .value.replaceAll("{", "&#123;")
            .replaceAll("}", "&#125;")}</Code>`
        );
      }
    }
  }

  //console.log(content);
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
