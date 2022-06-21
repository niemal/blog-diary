import Header from '../components/header';
import Footer from '../components/footer';
import Layout from '../components/layout';
import PostBlock from '../components/post-block';
import Pagination from '../components/blog-page-nav';
import Tags from '../components/tags';
import { Butterfly, Butterfly2 } from '../components/butterfly-background';
import Sub from '../components/sub';

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from '../styles/Blog.module.css';
import { useState, useRef, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { getBlogPosts } from '../lib/posts';
import { author } from '../lib/author';

export async function getStaticProps() {
  const data = getBlogPosts();
  return {
    props: {
      data: data.posts,
      author: author,
      siteUrl: data.siteUrl
    }
  };
}

function buildBlocks(data, tags=[]) {
  let pages = [];
  let fresh = false;

  if (tags.length > 0) {
    data = data.filter((d) => {
      for (let i = 0; i < tags.length; i++) {
        if (!d.tags.includes(tags[i][0]))
          return false;
      }
      return true;
    });
  } else {
    fresh = true;
  }

  //console.log(fresh, data.length);
  for (let i = 0; i < data.length; i+=3) {
    let page = [];
    for (let y = i; y < i+3 && y < data.length; y++) {
      page.push(<PostBlock key={data[y].id} post={data[y]}></PostBlock>);
      
      if (fresh) {
        data[y].tags.forEach((tag) => {
          let exists = false;
          for (let i = 0; i < tags.length; i++) {
            if (tag === tags[i][0])
              exists = true;
          }
          if (!exists)
            tags.push([tag, 'disabled']);
        });
      }
    }
    pages.push(page);
  }

  return [pages, tags];
};

export default function Home({ data, author, siteUrl }) {
  const parallax = useRef();
  const [height, setHeight] = useState(0);
  const [pConfig, setpConfig] = useState({
    pages: 2.1,
    pagination: {
      start: 0.2,
      end: 1.5
    },
    leftContainer: {
      start: 0.2,
      end: 1
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
        pages: 2.8,
        pagination: {
          start: 0.2,
          end: 2.5
        },
        leftContainer: {
          start: 0.2,
          end: 1.1
        },
        bfly: 0.5,
        input: 0.5,
        footer: 2,
        footerBfly: 2.2,
      });
    }
  }, []);
  
  let [pages, tags] = buildBlocks(data);

  let [searchInput, setSearchInput] = useState('');
  let [tagsEntries, setTagsEntries] = useState('');

  let [tagsElem, setTagsElem] = useState('');
  let [mainElem, setMainElem] = useState('');
  let [pagesElem, setPagesElem] = useState('');

  const navigate = (current, iter, steps, pages) => {
    setMainElem(pages[current-1]);
    setPagesElem(<Pagination current={current} iter={iter} steps={steps} pages={pages} callback={navigate} parallax={parallax}></Pagination>)
  };

  const searchNotFound = () => {
    let elem = [];
    elem.push(<a key={`link-to-home`} id={styles.goBack} className={`mx-auto ${styles.back} mt-20 lg:mt-20 shadow-md rounded`} onClick={() => { fillTagsElem(buildBlocks(data)[1]); setSearchInput(input => input.value = ''); setTimeout(search, 50); }}>&lt;=</a>);
    elem.push(<h2 key={`search-not-found`} id={styles.nomatch} className={`mx-auto text-3xl lg:text-4xl font-bold text-white mt-5`}>No blog posts matching your search were found.</h2>);
    setMainElem(elem);
    setPagesElem('');
  };

  const search = () => {
    let enabledTags = tagsEntries.filter((tags) => tags[1] === 'enabled');
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

    console.log('query exists', enabledTags);
    pages = buildBlocks(data.filter((d) => {
        let inp = searchInput.value.toLowerCase();
        return d.content.toLowerCase().indexOf(inp) > -1 || d.title.toLowerCase().indexOf(inp) > -1;
    }), enabledTags.length > 0 ? enabledTags : [])[0];

    if (pages.length > 0) navigate(1, 1, 3, pages);
    else searchNotFound();
  };

  const toggleTag = (tag) => {
    fillTagsElem(tagsEntries.map((t) => {
      if (t[0] === tag[0]) {
        if (t[1] === 'disabled')
          t[1] = 'enabled';
        else
          t[1] = 'disabled';
      }

      return t;
    }));
    search();
  };

  const fillTagsElem = (tags) => {
    tagsEntries = tags;
    setTagsEntries(tags);
    //console.log('tags: ', tags);
    //console.log('tagsEntries: ', tagsEntries);
    setTagsElem(<Tags tags={tags} callback={toggleTag}></Tags>);
  };


  if (searchInput.value === undefined)
    setSearchInput({ value: '' });
  if (tagsElem.length === 0)
    fillTagsElem(tags);
  if (mainElem.length === 0)
    navigate(1, 1, 3, pages);

  return (
    <>
    {!isMobile ? (
      height !== 0 ? (
        <Parallax ref={parallax} pages={pConfig.pages}>
        <Header
        url={siteUrl + '/blog'}
        desc={author.about}
        imageUrl={siteUrl + '/_next/image?url=%2Fbanners%2Fmeta_banner.png&w=1920&q=100'}
        social={author.social}
        preload={data.map((d) => d.banner)}
        >
        </Header>
        <ParallaxLayer style={{zIndex: 0}} offset={pConfig.bfly} speed={0.5}>
          <Butterfly2></Butterfly2>
        </ParallaxLayer>

        <ParallaxLayer style={{width: '25%', left: '3px'}}  sticky={pConfig.leftContainer}>
          <div id={styles.author} className={`rounded`}>
            <a href={author.homepage} className={`pb-4`}>{author.name}</a>
            <div style={{width: `50%`, height: `20vh`, backgroundPosition: '50% 50%', backgroundSize: 'cover', backgroundImage: `url('${author.avatar}')`, marginBottom: '10px', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto'}}></div>
            <span>{author.about}</span>
            <a href={author.social.twitter}>Twitter</a>
            <a href={author.social.github}>Github</a>
            <span id={styles.quote}>{author.quotes[Math.floor(Math.random() * author.quotes.length)]}</span>
          </div>

          <div className={`mt-4`}>
            <Sub siteUrl={siteUrl}></Sub>
          </div>
        </ParallaxLayer>
    
        <div id={styles.main} className="mt-32 mb-8">
          <ParallaxLayer style={{zIndex: 0}} offset={pConfig.input} speed={0.3} >
            <input
            type="text"
            className={`form-control block w-1/6 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
            id={styles.search}
            placeholder={`Search..`}
            onChange={(e) => { setSearchInput(e.target); search(); }}
            />
            
            {tagsElem}
          </ParallaxLayer>

          {mainElem}
          <ParallaxLayer style={{zIndex: 0, width: `25%`, height: `5%`, marginLeft: 'auto'}} sticky={pConfig.pagination} speed={0.3}>
            {pagesElem}
          </ParallaxLayer>
        </div>


        <ParallaxLayer id={styles.footer} style={{zIndex: 2, opacity: 0.6}} offset={pConfig.footer} speed={0.9}>
          <Footer></Footer>
        </ParallaxLayer>
        <ParallaxLayer style={{zIndex: 1}} offset={pConfig.footerBfly} speed={0.9}>
          <Butterfly></Butterfly>
        </ParallaxLayer>
      </Parallax>
      ) : ''
    ) : (
      <Layout headerOptions={{
          url: siteUrl,
          desc: author.about,
          imageUrl: siteUrl + '/_next/image?url=%2Fbanners%2Fmeta_banner.png&w=1920&q=100',
          social: author.social,
          preload: data.map((d) => d.banner)
        }}>
          <div id={styles.main} className="mt-32 mb-8">
            <input
            type="text"
            className={`form-control block w-1/4 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
            id={styles.search}
            placeholder="Search.."
            onChange={(e) => { setSearchInput(e.target); search(); }}
            />
            {tagsElem}
            {mainElem}
            <div id={styles.pagination}>{pagesElem}</div>
            <div id={styles.subMobile}>
              <Sub siteUrl={siteUrl}></Sub>
            </div>
          </div>
        </Layout>
    )}
    </>
  );
}
