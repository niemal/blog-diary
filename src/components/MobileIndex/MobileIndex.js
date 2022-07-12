import styled from "styled-components";
import Layout from "../Layout";
import Sub from "../Sub";
import SearchBox from "../SearchBox";
import { TagsButton } from "../Tags";
import { useState, createContext } from "react";
import { QUERIES } from "../constants";

const MainWrapper = styled.div`
  margin-top: 120px;
  max-width: min(100%, calc(550px + 32px * 2));
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 32px;
  flex-direction: column;
  align-items: center;

  transition: all 450ms;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 0 16px;
  }
  @media ${QUERIES.phoneAndSmaller} {
    max-width: 100%;
    padding: 0px 16px;
  }
`;

const InputAndTagsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  justify-content: space-between;

  & input {
    width: 60%;
  }
`;

const PaginationWrapper = styled.div``;

const MobileSubWrapper = styled.div`
  margin-bottom: 48px;
  width: 100%;
`;

export const CollapseContext = createContext();

function MobileIndex({
  siteUrl,
  author,
  preload,
  tagsElem,
  mainElem,
  pagesElem,
  searchHandler,
}) {
  const [collapse, setCollapse] = useState(false);

  return (
    <Layout
      url={siteUrl}
      desc={author.about}
      social={author.social}
      preload={preload}
    >
      <MainWrapper>
        <InputAndTagsWrapper>
          <SearchBox
            type="text"
            placeholder="Search.."
            onChange={searchHandler}
          />
          <TagsButton
            collapse={collapse}
            clickHandler={() => {
              setCollapse((coll) => !coll);
            }}
          />
        </InputAndTagsWrapper>

        <CollapseContext.Provider value={{ collapse, setCollapse }}>
          {tagsElem}
        </CollapseContext.Provider>

        {mainElem}

        <PaginationWrapper>{pagesElem}</PaginationWrapper>
        <MobileSubWrapper>
          <Sub siteUrl={siteUrl} />
        </MobileSubWrapper>
      </MainWrapper>
    </Layout>
  );
}

export default MobileIndex;
