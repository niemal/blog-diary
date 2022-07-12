import styled from "styled-components";
import SpanHover from "../SpanHover";
import { Butterfly2 } from "../ButterflyImages";

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: var(--color-primary);
  border-radius: 5000px 5000px 1000px 1000px;
  text-shadow: 2px 2px 3px rgb(0, 0, 0);
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
  padding: 48px;
  line-height: ${32 / 16}rem;
`;

const TitleLink = styled(SpanHover).attrs({
  as: "a",
})`
  text-decoration: none;
  font-size: ${38 / 16}rem;
  font-weight: var(--font-weight-bold);
  z-index: 3;

  /* @media (max-width: 925px) {
    & {
      width: 8rem;
      color: rgb(25, 255, 255);
      text-decoration-color: rgb(25, 255, 255);
    }
  } */
`;

const AuthorImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 5000px;
  filter: drop-shadow(0px -8px 30px var(--color-tertiary));
  z-index: 1;

  /* @media (max-width: 925px) {
    & {
      margin-bottom: 8px;
      width: 150px;
      height: 150px;
    }
  } */
`;

const About = styled.p`
  font-size: ${22 / 16}rem;
  text-align: center;
  z-index: 2;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled(SpanHover).attrs({
  as: "a",
})`
  text-decoration: none;
  font-size: ${26 / 16}rem;
  font-weight: var(--font-weight-bold);
  z-index: 2;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: -180px;
  right: -20px;
  width: 100%;
  z-index: ${(p) => (p.fullCard ? 1 : 3)};

  & img {
    transform: rotate(200deg);
    filter: drop-shadow(3px 3px 5px var(--color-info));
  }
`;

const Quote = styled.span`
  font-style: italic;
  text-align: center;
  font-weight: var(--font-weight-medium);
  line-height: ${22 / 16}rem;
  opacity: 0.7;
`;

function AuthorCard({ author, fullCard = false }) {
  return (
    <Wrapper>
      <ImageWrapper fullCard={fullCard}>
        <Butterfly2 />
      </ImageWrapper>
      <TitleLink href={author.homepage}>{author.name}</TitleLink>
      <AuthorImage src={author.avatar} />

      <About>{author.about}</About>

      <LinkWrapper>
        <Link href={author.social.twitter}>Twitter</Link>
        <Link href={author.social.github}>Github</Link>
      </LinkWrapper>

      <Quote>
        {author.quotes[Math.floor(Math.random() * author.quotes.length)]}
      </Quote>
    </Wrapper>
  );
}

export default AuthorCard;
