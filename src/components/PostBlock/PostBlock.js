import Image from "next/image";
import uuid from "uuid";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 12px;
  border: 4px solid var(--color-primary);
  border-radius: 8px;
  background: var(--color-secondary);
  position: relative;
  opacity: 1;
  transition: all 200ms;

  &:hover {
    opacity: 1;
    border-color: var(--color-text);
    box-shadow: 0 0 10px var(--color-info);
    cursor: pointer;
  }

  @media ${QUERIES.tabletAndSmaller} {
    min-width: 100%;
  }

  @media ${QUERIES.tabletAndSmaller} {
    border-radius: 80px;
  }
`;

const Title = styled.h1`
  font-size: ${36 / 16}rem;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  text-align: center;
  transition: color 250ms ease-in-out;

  ${Wrapper}:hover & {
    color: var(--color-tertiary);
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  border: 8px solid var(--color-info);
  border-radius: 8px;
  transition: border-color 250ms ease-in-out;

  ${Wrapper}:hover & {
    border-color: var(--color-text);
  }

  @media ${QUERIES.laptopAndSmaller} {
    height: 35vh;
  }
  @media ${QUERIES.tabletAndSmaller} {
    height: 30vh;
  }
`;

const PostDate = styled.div`
  font-size: ${20 / 16}rem;
  display: flex;
  gap: 8px;
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  transition: color 350ms ease-in-out;
  align-self: center;

  ${Wrapper}:hover & {
    color: var(--color-tertiary);
  }
`;

const PostDesc = styled.div`
  color: var(--color-text);
  font-weight: var(--font-weight-light);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: stretch;
  gap: 8px;
`;

const Tag = styled.span`
  border: 2px solid var(--color-text);
  /* background-color: var(--color-primary); */
  background: linear-gradient(
    90deg,
    var(--color-primary) 5%,
    var(--color-secondary) 25%,
    var(--color-primary) 65%,
    var(--color-secondary) 100%
  );
  text-shadow: 2px 3px 4px hsl(0deg 0% 0% / 0.7);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  padding: 8px;
  border-radius: 16px;
  transition: color 350ms ease-in-out;

  ${Wrapper}:hover & {
    border-color: var(--color-tertiary);
  }
`;

function PostBlock({ post }) {
  let props = {
    from: { opacity: 0, transform: "scaleX(0)", right: "1000px" },
    enter: { opacity: 0.8, transform: "scaleX(1)", right: "0px" },
    leave: { opacity: 0, transform: "scaleX(0)", width: "0%" },
  };
  const transition = useTransition([null], props);

  return (
    <>
      {transition((props, whatever) => (
        <animated.a
          key={uuid()}
          href={`/blog/posts/${post.id}`}
          style={{ textDecoration: "none", width: "100%", ...props }}
        >
          <Wrapper>
            <Title>{post.title}</Title>

            {post.banner.length > 0 ? <Banner src={post.banner} /> : ""}

            <PostDate>
              <Image src="/blog/clock.svg" alt={""} width={20} height={18} />
              <span>{post.time}</span>
            </PostDate>

            <PostDesc>{post.desc}</PostDesc>
            <TagsWrapper>
              {post.tags.map((tag) => (
                <Tag key={uuid()}>{tag}</Tag>
              ))}
            </TagsWrapper>
          </Wrapper>
        </animated.a>
      ))}
    </>
  );
}

export default PostBlock;
