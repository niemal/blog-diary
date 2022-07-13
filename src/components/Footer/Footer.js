import Link from "next/link";
import styled from "styled-components";
import SpanHover from "../SpanHover";
import { Butterfly2 } from "../ButterflyImages";
import { QUERIES } from "../constants";

const Wrapper = styled.footer`
  width: 100%;
  position: relative;
  min-height: 100px;
  background-color: ${(p) => p.color};
  box-shadow: 4px 2px 5px 1px rgba(0, 0, 0, 0.7);

  @media ${QUERIES.tabletAndSmaller} {
    min-height: 120px;
  }
  @media ${QUERIES.phoneAndSmaller} {
    min-height: 220px;
  }
`;

const DesktopAndTabletWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transition: filter ease-in-out 500ms;
  justify-content: center;
  align-items: center;
  padding: 16px 64px;
  z-index: 3;

  &:hover img {
    filter: invert(78%) sepia(50%) saturate(1025%) hue-rotate(137deg)
      brightness(107%) contrast(105%);
  }
  display: flex;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
  }
  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MobileWrapper = styled(DesktopAndTabletWrapper)`
  display: none;
  flex-direction: column;

  @media ${QUERIES.phoneAndSmaller} {
    display: flex;
  }
`;

const NavWrapper = styled.nav`
  font-size: ${22 / 16}rem;
  font-weight: var(--font-weight-medium);
  display: flex;
  gap: 16px;
  align-items: center;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    gap: 8px;
  }
`;

const LinkText = styled(SpanHover)``;

const ImageWrapper = styled.div`
  padding: 0px 8px;
`;

const LastText = styled.div`
  font-size: ${20 / 16}rem;
  font-weight: var(--font-weight-medium);
  justify-self: flex-end;
  color: var(--color-text);
  display: flex;
  gap: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 8px;
  }
  @media ${QUERIES.phoneAndSmaller} {
    gap: 8px;
    justify-self: end;
    align-self: flex-end;
  }
`;

const LastTextSpan = styled.span`
  font-weight: var(--font-weight-medium);
  filter: drop-shadow(3px 3px 10px var(--color-text));
`;

const Filler = styled.div`
  flex: 1;
  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const ImageLastTextWrapper = styled.div`
  display: flex;
  gap: 48px;
`;

function Footer({ color = "var(--color-primary-fade)" }) {
  return (
    <Wrapper color={color}>
      <DesktopAndTabletWrapper>
        <Filler />
        <NavWrapper>
          <Link href="/">
            <LinkText>blog</LinkText>
          </Link>
          <Link href="/diary">
            <LinkText>diary</LinkText>
          </Link>
          <ImageWrapper>
            <Butterfly2 height={75} width={75} />
          </ImageWrapper>
          <Link href="/about">
            <LinkText>about</LinkText>
          </Link>
        </NavWrapper>
        <Filler />
        <LastText>
          <LastTextSpan>❤️</LastTextSpan>
          <LastTextSpan>&#60;&#47;&#62;</LastTextSpan>
          <Link href="https://github.com/niemal/" target="_blank">
            <LinkText>niemal</LinkText>
          </Link>
          <LastTextSpan>🌺</LastTextSpan>
        </LastText>
      </DesktopAndTabletWrapper>
      <MobileWrapper>
        <NavWrapper>
          <Link href="/">
            <LinkText>blog</LinkText>
          </Link>
          <Link href="/diary">
            <LinkText>diary</LinkText>
          </Link>
          <Link href="/about">
            <LinkText>about</LinkText>
          </Link>
        </NavWrapper>
        <ImageLastTextWrapper>
          <Butterfly2 height={75} width={75} />
          <LastText>
            <LastTextSpan>❤️</LastTextSpan>
            <LastTextSpan>&#60;&#47;&#62;</LastTextSpan>
            <Link href="https://github.com/niemal/" target="_blank">
              <LinkText>niemal</LinkText>
            </Link>
            <LastTextSpan>🌺</LastTextSpan>
          </LastText>
        </ImageLastTextWrapper>
      </MobileWrapper>
    </Wrapper>
  );
}

export default Footer;
