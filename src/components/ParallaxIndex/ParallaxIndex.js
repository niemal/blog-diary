import Header from "../Header";
import Footer from "../Footer";
import { Butterfly, Butterfly2 } from "../ButterflyImages";
import Sub from "../Sub";
import AuthorCard from "../AuthorCard";
import { QUERIES } from "../constants";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    align-self: flex-start;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 32px;
  margin: 0 36px;

  @media ${QUERIES.tabletAndSmaller} {
    align-self: flex-start;
    width: 60%;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

// className={`form-control block w-1/6 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
const Input = styled.input`
  max-width: 250px;
  width: 100%;
  padding: 8px;
  font-size: ${22 / 16}rem;
  font-weight: var(--font-weight-bold);
  border: 5px solid var(--color-secondary);
  border-radius: 8px;
  background-color: var(--color-primary);
  color: var(--color-text);

  &::placeholder {
    color: var(--color-text);
  }
  &:focus {
    background-color: var(--color-info);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:focus::placeholder {
    color: var(--color-gray-800);
  }
`;

const Filler = styled.div`
  flex: 1;
`;

const FooterWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const InputAndTagsWrapper = styled.div`
  & div:first-of-type {
    z-index: 1 !important;
    margin-left: auto !important;
    margin-right: 36px !important;

    @media ${QUERIES.laptopAndSmaller} {
    }
  }
`;

const PaginationWrapper = styled.div`
  & div:first-of-type {
    width: 25% !important;
    margin-left: auto !important;
    margin-right: 36px !important;
    @media ${QUERIES.laptopAndSmaller} {
      width: 35% !important;
    }
  }
`;
function ParallaxIndex({
  preload,
  author,
  siteUrl,
  parallax,
  pConfig,
  tagsElem,
  pagesElem,
  mainElem,
  searchHandler,
}) {
  return (
    <Parallax ref={parallax} pages={pConfig.pages}>
      <Header
        url={siteUrl + "/blog"}
        desc={author.about}
        imageUrl={
          siteUrl + "/_next/image?url=%2Fbanners%2Fmeta_banner.png&w=1920&q=100"
        }
        social={author.social}
        preload={preload}
      />

      <ParallaxLayer
        style={{ opacity: "0.75", left: "50%" }}
        offset={pConfig.bfly}
        speed={0.5}
      >
        <Butterfly2 />
      </ParallaxLayer>

      <ParallaxLayer
        style={{ width: "25%", marginLeft: "36px" }}
        sticky={pConfig.leftContainer}
      >
        <LeftWrapper>
          <AuthorCard author={author} />
          <Sub siteUrl={siteUrl} />
        </LeftWrapper>
      </ParallaxLayer>

      <Wrapper>
        {/* <InputAndTagsWrapper> */}
        <ParallaxLayer
          style={{
            zIndex: 2,
            width: "25%",
            marginLeft: "auto",
            marginRight: "36px",
            height: "0px",
          }}
          offset={pConfig.input}
          speed={0.9}
        >
          <InputWrapper>
            <Input
              type="text"
              placeholder={`Search..`}
              onChange={searchHandler}
            />

            {tagsElem}
            <Filler />
          </InputWrapper>
        </ParallaxLayer>
        {/* </InputAndTagsWrapper> */}

        <MainWrapper>{mainElem}</MainWrapper>
        {/* <PaginationWrapper> */}
        <ParallaxLayer
          style={{
            zIndex: 1,
            width: `25%`,
            marginLeft: "auto",
            marginRight: "36px",
            marginTop: "120px",
          }}
          sticky={pConfig.pagination}
          speed={0.3}
        >
          {pagesElem}
        </ParallaxLayer>
        {/* </PaginationWrapper> */}
      </Wrapper>

      <ParallaxLayer
        style={{ zIndex: 0 }}
        offset={pConfig.footerBfly}
        speed={0.9}
      >
        <Butterfly />
      </ParallaxLayer>

      <FooterWrapper>
        <Footer color={`var(--color-primary-fade)`} />
      </FooterWrapper>
    </Parallax>
  );
}

export default ParallaxIndex;
