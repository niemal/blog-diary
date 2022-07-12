import { author, config } from "../../lib/author";
import Layout from "../components/Layout";
import AuthorCard from "../components/AuthorCard";
import { QUERIES } from "../components/constants";
import styled from "styled-components";

export async function getStaticProps() {
  return {
    props: {
      author: author,
      siteUrl: config.siteUrl,
    },
  };
}

const Wrapper = styled.div`
  @media ${QUERIES.laptopAndSmaller} {
    margin-bottom: 32px;
  }
  @media ${QUERIES.tabletAndSmaller} {
    margin-top: 120px;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export default function About({ author, siteUrl }) {
  return (
    <Layout
      url={siteUrl + "/about"}
      desc={author.about}
      social={author.social}
      preload={[author.avatar]}
      overflow={"hidden"}
      grid={true}
    >
      <Wrapper>
        <AuthorCard author={author} fullCard={true} />
      </Wrapper>
    </Layout>
  );
}
