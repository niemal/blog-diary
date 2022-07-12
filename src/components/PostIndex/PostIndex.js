import React from "react";
import styled from "styled-components";
import JsxParser from "react-jsx-parser";
import Image from "next/image";
import Sub from "../Sub";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  max-width: min(100%, calc(1200px + 32px * 2));
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    margin-top: 120px;
  }
`;

const Title = styled.h1`
  font-size: ${32 / 16}rem;
  font-weight: var(--font-weight-bold);
  text-align: center;
  background: linear-gradient(
    90deg,
    var(--color-tertiary) 40%,
    var(--color-text) 100%
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  border: 3px solid var(--color-text);
  border-radius: 8px 8px 0 0;
  border-bottom: 0;
  border-left: 0;
  border-top: 0;
  box-shadow: -3px -3px 6px var(--color-tertiary);
  padding: 16px 24px;

  &::selection {
    -webkit-text-fill-color: var(--color-text);
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 80%;
  }
`;

const HeaderWrapper = styled.div`
  border: 1px solid var(--color-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  padding: 24px;
  padding-bottom: 0px;

  @media ${QUERIES.phoneAndSmaller} {
    padding: 0;
  }
`;

const BannerImage = styled.img`
  border: 3px solid var(--color-text);
  width: 85%;
  height: 40vh;
  object-fit: cover;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
  }
`;

const DateWrapper = styled.div`
  color: var(--color-gray-100);
  font-size: ${22 / 16}rem;
  font-weight: var(--font-weight-medium);

  justify-content: center;
  gap: 8px;
  display: flex;

  & img {
    filter: invert(76%) sepia(35%) saturate(390%) hue-rotate(178deg)
      brightness(104%) contrast(103%);
  }
`;

const TagsPreWrapper = styled.div`
  width: 100%;
  padding: 24px;
  border: 3px solid var(--color-text);
  border-top: 0px;
  margin-bottom: 16px;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 2px 3px 3px var(--color-gray-700);
  background-color: var(--color-background);
`;

const TagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
`;

const Tag = styled.a`
  text-decoration: none;
  border: 3px solid;
  text-align: center;
  border-color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
  text-shadow: 2px 2px 4px hsl(0deg 0% 0% / 0.7);
  border-radius: 8px;
  color: var(--color-text);

  background: linear-gradient(
    90deg,
    var(--color-info) 5%,
    var(--color-tertiary) 25%,
    var(--color-info) 65%,
    var(--color-tertiary) 100%
  );

  padding: 8px;
  cursor: pointer;
  transition: opacity border-color 250ms ease-in-out;

  &:hover {
    box-shadow: 0 0 10px var(--color-tertiary);
    border-color: var(--color-info);
  }
`;

// Post wrapper
const PostWrapper = styled.div`
  /* background-color: var(--color-background-fade); */
  display: grid;
  grid-template-columns: 1fr min(75ch, 100%) 1fr;

  & > * {
    grid-column: 2;
  }

  /* general Code */
  & pre {
    overflow: auto;
    margin-bottom: 32px;
    margin-top: -16px;
    border-radius: 8px;
    border: 3px solid var(--color-info);
    font-weight: var(--font-weight-medium);
  }

  @media ${QUERIES.tabletAndSmaller} {
    background-color: var(--color-background-fade);
  }
`;

// Post-related CSS for JSX injection
const H1 = styled.h1`
  font-size: ${36 / 16}rem;
  font-weight: var(--font-weight-bold);

  margin: 24px 0;
  border: 2px solid var(--color-text);
  border-radius: 0px 0px 0px 16px;
  border-right: 0;
  border-top: 0;
  padding-bottom: 16px;
  padding-left: 16px;
  grid-column: -2 / 1; /* half bleed on left */
`;

const H2 = styled(H1)`
  font-size: ${32 / 16}rem;
`;

const Em = styled.em`
  font-style: italic;
`;

const Strong = styled.strong`
  text-shadow: 1px 1px 2px black;
  font-weight: var(--font-weight-bold);
  white-space: pre-wrap;
  padding: 0 4px;
`;

const Blockquote = styled.blockquote`
  opacity: 0.85;
  border: 3px solid var(--color-text);
  border-radius: 16px;
  box-shadow: 2px 2px 6px var(--color-primary);
  text-shadow: 2px 2px 2px var(--color-gray-900);
  padding: 16px;
  font-size: ${20 / 16}rem;
  font-style: italic;
  text-align: left;
  margin-bottom: 24px;
  background: conic-gradient(
    from 180deg at 100% 100%,
    var(--color-tertiary) 15%,
    var(--color-background) 30%,
    var(--color-secondary) 52%,
    var(--color-primary) 70%,
    var(--color-secondary) 80%,
    var(--color-info) 100%
  );

  & ${Em}, & ${Strong} {
    display: block;
    text-align: right;
    font-size: ${24 / 16}rem;
    font-style: normal;
  }
  & ${Em} {
    font-weight: var(--font-weight-medium);
  }
`;

const PostLink = styled.a`
  text-decoration: underline var(--color-text);
  text-underline-offset: 4px;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  transition: color text-decoration 250ms ease-in-out;

  &:hover {
    color: var(--color-tertiary);
    text-decoration-color: var(--color-tertiary);
  }
`;

const PostImage = styled.img`
  margin-bottom: 32px;
  padding: 8px;
  border-radius: 16px;
  max-height: 50vh;
  border: 3px solid var(--color-text);
  width: 100%;
  object-fit: cover;
  background: conic-gradient(
    from 200deg at 100% 100%,
    var(--color-tertiary) 15%,
    var(--color-background) 30%,
    var(--color-secondary) 52%,
    var(--color-primary) 70%,
    var(--color-secondary) 80%,
    var(--color-info) 100%
  );
`;

const Li = styled.li`
  font-size: ${22 / 16}rem;

  @media ${QUERIES.tabletAndSmaller} {
    margin-left: 32px;
  }
`;

const Ol = styled.ol`
  & ${Li} {
    counter-increment: section;
    font-size: ${25 / 16}rem;
  }
  & ${Li}::marker {
    content: counter(section) ")  ";
    font-weight: var(--font-weight-bold);
  }
  &,
  & ${Li}:last-of-type {
    margin-bottom: 32px;
  }
`;

const Ul = styled.ul`
  & ${Li} {
    /* list-style-image: url("/blog/right-arrow.svg"); */
    /* margin: -36px 0; */
    font-size: ${25 / 16}rem;
    padding-left: 8px;
  }
  & ${Li}::marker {
    font-size: 1.5rem;
    content: "⇝";
  }
  &,
  & ${Li}:last-of-type {
    margin-bottom: 16px;
  }
`;

const Code = styled.code`
  font-size: ${20 / 16}rem;
`;

const InlineCode = styled.code`
  font-weight: var(--font-weight-medium);
  border-radius: 8px;
`;

const P = styled.p`
  font-size: ${22 / 16}rem;
  line-height: 1.5;
`;

function PostIndex({ data, siteUrl }) {
  return (
    <Wrapper>
      <Title>{data.title}</Title>

      <HeaderWrapper>
        {data.banner.length > 0 ? <BannerImage src={data.banner} /> : ""}

        <DateWrapper>
          <Image src={"/blog/clock.svg"} alt={""} width={20} height={18} />
          <span>{data.time}</span>
        </DateWrapper>
        <TagsPreWrapper>
          <TagsWrapper>
            {data.tags.map((tag) => (
              <Tag key={tag} href={`/blog`}>
                {tag}
              </Tag>
            ))}
          </TagsWrapper>
        </TagsPreWrapper>
      </HeaderWrapper>

      <PostWrapper>
        <JsxParser
          components={{
            H1,
            H2,
            Em,
            Strong,
            Blockquote,
            PostLink,
            PostImage,
            Li,
            Ol,
            Ul,
            Code,
            InlineCode,
            P,
          }}
          jsx={data.content}
          renderInWrapper={false}
          onError={(err) => {
            console.log(err);
          }}
        />
      </PostWrapper>

      <Sub siteUrl={siteUrl}></Sub>
    </Wrapper>
  );
}

export default PostIndex;
