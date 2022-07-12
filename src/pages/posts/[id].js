import Layout from "../../components/Layout";
import PostIndex from "../../components/PostIndex";
import { getAllPostIds, getPostData } from "../../../lib/posts";
import { animated, useTransition } from "react-spring";
import { author } from "../../../lib/author";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = getPostData(params.id);
  return {
    props: {
      postData: data.post,
      siteUrl: data.siteUrl,
      author: author,
    },
  };
}

export default function Post({ postData, siteUrl, author }) {
  let props = {
    from: { opacity: 0, transform: "scaleY(0)", x: -1000 },
    enter: { opacity: 1, transform: "scaleY(1)", x: 0 },
  };
  let transition = useTransition(null, props);

  return (
    <Layout
      title={postData.title}
      url={
        siteUrl + "/posts/" + postData.title.toLowerCase().replaceAll(" ", "-")
      }
      desc={postData.desc}
      imageUrl={siteUrl + postData.banner}
      social={author.social}
      preload={postData.banner.length > 0 ? [postData.banner] : []}
    >
      {transition((props, _) => (
        <animated.div style={props}>
          <PostIndex data={postData} siteUrl={siteUrl} />
        </animated.div>
      ))}
    </Layout>
  );
}
