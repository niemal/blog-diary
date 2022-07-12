import PostBlock from "../components/PostBlock";
import Pagination from "../components/Pagination";
import Tags from "../components/Tags";
import ParallaxIndex from "../components/ParallaxIndex";
import MobileIndex from "../components/MobileIndex";

import { getBlogPosts } from "../../lib/posts";
import { author } from "../../lib/author";

import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";

export async function getStaticProps() {
  const data = getBlogPosts();
  return {
    props: {
      data: data.posts,
      author: author,
      siteUrl: data.siteUrl,
    },
  };
}

function buildBlocks(data, tags = []) {
  let pages = [];
  let fresh = false;

  if (tags.length > 0) {
    data = data.filter((d) => {
      for (let i = 0; i < tags.length; i++) {
        if (!d.tags.includes(tags[i][0])) return false;
      }
      return true;
    });
  } else {
    fresh = true;
  }

  //console.log(fresh, data.length);
  for (let i = 0; i < data.length; i += 3) {
    let page = [];
    for (let y = i; y < i + 3 && y < data.length; y++) {
      page.push(<PostBlock key={data[y].id} post={data[y]}></PostBlock>);

      if (fresh) {
        data[y].tags.forEach((tag) => {
          let exists = false;
          for (let i = 0; i < tags.length; i++) {
            if (tag === tags[i][0]) exists = true;
          }
          if (!exists) tags.push([tag, "disabled"]);
        });
      }
    }
    pages.push(page);
  }

  return [pages, tags];
}

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  margin-top: 128px;
`;

const ResetSearchButton = styled.a`
  align-self: flex-end;
  font-size: 2rem;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  padding: 6px 8px;
  width: 128px;
  border: 3px solid var(--color-tertiary);
  background-color: var(--color-primary);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color border-color color 250ms ease-in-out;

  &:hover {
    background-color: var(--color-tertiary);
    border-color: var(--color-primary);
    color: var(--color-info);
  }
`;

const SearchNotFound = styled.h2`
  font-size: ${36 / 16}rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
`;

export default function Home({ data, author, siteUrl }) {
  const parallax = useRef();
  const [height, setHeight] = useState(0);
  const [pConfig, setpConfig] = useState({
    pages: 1.7,
    pagination: {
      start: 0.2,
      end: 1.2,
    },
    leftContainer: {
      start: 0.2,
      end: 0.5,
    },
    bfly: 0.5,
    input: 0.5,
    footer: 1.9,
    footerBfly: 1.9,
  });

  useEffect(() => {
    while (window.innerHeight === 0) {}
    setHeight(window.innerHeight);

    if (window.innerHeight < 900) {
      setpConfig({
        pages: 2.7,
        pagination: {
          start: 0.1,
          end: 1.2,
        },
        leftContainer: {
          start: 0.2,
          end: 1.1,
        },
        bfly: 0.5,
        input: 0.5,
        footer: 1.8,
        footerBfly: 2,
      });
    }
  }, []);

  let [pages, tags] = buildBlocks(data);

  let [searchInput, setSearchInput] = useState("");
  let [tagsEntries, setTagsEntries] = useState("");

  let [tagsElem, setTagsElem] = useState("");
  let [mainElem, setMainElem] = useState("");
  let [pagesElem, setPagesElem] = useState("");

  const navigate = (current, iter, steps, pages) => {
    setMainElem(pages[current - 1]);
    setPagesElem(
      <Pagination
        current={current}
        iter={iter}
        steps={steps}
        pages={pages}
        callback={navigate}
        parallax={parallax}
      ></Pagination>
    );
  };

  const searchNotFound = () => {
    let elem = [];
    elem.push(
      <ResetSearchButton
        key={`link-to-home`}
        onClick={() => {
          fillTagsElem(buildBlocks(data)[1]);
          setSearchInput((input) => (input.value = ""));
          setTimeout(search, 50);
        }}
      >
        &lt;=
      </ResetSearchButton>
    );
    elem.push(
      <SearchNotFound key={`search-not-found`}>
        No blog posts matching your search were found.
      </SearchNotFound>
    );
    setMainElem(<NotFoundWrapper>{elem}</NotFoundWrapper>);
    setPagesElem("");
  };

  const search = () => {
    let enabledTags = tagsEntries.filter((tags) => tags[1] === "enabled");
    //console.log(enabledTags);
    if (searchInput === undefined || searchInput.value === undefined) {
      pages = buildBlocks(data, enabledTags.length > 0 ? enabledTags : [])[0];
      //console.log('query doesnt exist 1');
      if (pages.length > 0) navigate(1, 1, 3, pages);
      else searchNotFound();
      return;
    } else if (searchInput.value.length === 0) {
      //console.log('query doesnt exist 2');
      pages = buildBlocks(data, enabledTags.length > 0 ? enabledTags : [])[0];
      if (pages.length > 0) navigate(1, 1, 3, pages);
      else searchNotFound();
      return;
    }

    console.log("query exists", enabledTags);
    pages = buildBlocks(
      data.filter((d) => {
        let inp = searchInput.value.toLowerCase();
        return (
          d.content.toLowerCase().indexOf(inp) > -1 ||
          d.title.toLowerCase().indexOf(inp) > -1
        );
      }),
      enabledTags.length > 0 ? enabledTags : []
    )[0];

    if (pages.length > 0) navigate(1, 1, 3, pages);
    else searchNotFound();
  };

  const toggleTag = (tag) => {
    fillTagsElem(
      tagsEntries.map((t) => {
        if (t[0] === tag[0]) {
          if (t[1] === "disabled") t[1] = "enabled";
          else t[1] = "disabled";
        }

        return t;
      })
    );
    search();
  };

  const fillTagsElem = (tags) => {
    tagsEntries = tags;
    setTagsEntries(tags);
    //console.log('tags: ', tags);
    //console.log('tagsEntries: ', tagsEntries);
    setTagsElem(
      <Tags tags={tags} callback={toggleTag} parallax={parallax}></Tags>
    );
  };

  if (searchInput.value === undefined) setSearchInput({ value: "" });
  if (tagsElem.length === 0) fillTagsElem(tags);
  if (mainElem.length === 0) navigate(1, 1, 3, pages);

  return (
    <>
      {!isMobile ? (
        height !== 0 ? (
          <ParallaxIndex
            preload={data.map((d) => d.banner)}
            author={author}
            siteUrl={siteUrl}
            parallax={parallax}
            pConfig={pConfig}
            tagsElem={tagsElem}
            pagesElem={pagesElem}
            mainElem={mainElem}
            searchHandler={(e) => {
              setSearchInput(e.target);
              search();
            }}
          />
        ) : (
          ""
        )
      ) : (
        <MobileIndex
          preload={data.map((d) => d.banner)}
          author={author}
          siteUrl={siteUrl}
          tagsElem={tagsElem}
          pagesElem={pagesElem}
          mainElem={mainElem}
          searchHandler={(e) => {
            setSearchInput(e.target);
            search();
          }}
        />
      )}
    </>
  );
}
