import Link from "next/link";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { Butterfly } from "../ButterflyImages";
import { BurgerIcon } from "../Burger";
import SpanHover from "../SpanHover";
import { QUERIES } from "../constants";

const DesktopTabletWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 32px;
  min-height: 80px;
  width: 100%;
  top: 0;
  background: radial-gradient(
    circle at 50% 50%,
    var(--color-gray-800) 30%,
    var(--color-gray-600) 100%
  );
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);

  & img {
    filter: invert(28%) sepia(49%) saturate(4962%) hue-rotate(220deg)
      brightness(100%) contrast(102%);
    transition: filter 500ms;
  }
  &:hover img {
    filter: invert(78%) sepia(50%) saturate(1025%) hue-rotate(137deg)
      brightness(107%) contrast(105%);
  }

  margin-bottom: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    position: fixed;
    top: 0;
    z-index: 99;
  }

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MobileWrapper = styled(DesktopTabletWrapper)`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: flex;
    gap: 12px;
  }
`;

const Filler = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const SocialWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
`;

const SocialLink = styled.a`
  transition: filter 500ms;

  &:hover {
    cursor: pointer;
    filter: invert(78%) sepia(50%) saturate(1025%) hue-rotate(137deg)
      brightness(107%) contrast(105%);
  }
`;

const NavBar = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: baseline;

  @media ${QUERIES.tabletAndSmaller} {
    align-items: center;
  }
`;

const LinkText = styled(SpanHover).attrs({
  as: "a",
})`
  text-decoration: none;
  font-size: ${20 / 16}rem;
  font-weight: var(--font-weight-medium);
`;

const Collapse = styled(LinkText).attrs({
  as: "span",
})`
  margin-left: 12px;
  transition: all 750ms;

  &:hover {
    cursor: default;
  }
  @media ${QUERIES.tabletAndSmaller} {
    margin-left: 0;
  }

  @media ${QUERIES.phoneAndSmaller} {
    margin-left: -16px;
  }
`;

const Rotate = styled.span`
  z-index: 3;
  ${Collapse}:hover & {
    transform-origin: center;
    transition: ease all 750ms;
    position: absolute;
    top: 2px;
    left: 0;
    /* padding-right: 4rem; */
    /* margin-top: 3.5rem; */
    -ms-transform: rotate(90deg); /* IE 9 */
    -webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */
    transform: rotate(90deg);
  }
`;

const CollapseTitle = styled.span`
  ${Collapse}:hover & {
    margin-left: 11px;
  }
`;

const downOut = keyframes`
  0% {
    transform: translateZ(200px) translateY(40px);
  }
  80% {
    transform: translateZ(-10px) translateY(0px);
  }
  100% {
    transform: translateZ(0px) translateY(0px);
  }
`;

const CollapseEntry = styled(LinkText).attrs({
  as: "a",
})`
  position: absolute;
  background-color: var(--color-secondary-fade);
  padding: 2rem;
  display: none;
  width: 500px;
  max-width: max-content;
  margin-right: 5rem;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border: 4px solid var(--color-gray-800);
  z-index: 2;
  text-decoration: none;

  &:after {
    bottom: 0px;
  }

  ${Collapse}:hover & {
    transform-origin: top center;
    animation: ${downOut} 150ms ease-in-out forwards;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  @media ${QUERIES.tabletAndSmaller} {
    left: -400% !important;
    top: 44px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 400px;
    left: -270% !important;
  }
`;

const CollapseEntryImageWrapper = styled.div`
  & > span img {
    object-fit: cover;
    opacity: 0.9;
    border-radius: 12px;
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.35);
    filter: none !important;

    @media ${QUERIES.tabletAndSmaller} {
      width: 130px !important;
      height: 130px !important;
    }
  }
`;

const CollapseEntryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CollapseEntryTitle = styled.span`
  font-weight: var(--font-weight-bold);
  align-self: center;
`;

const CollapseEntryDescription = styled.span`
  color: var(--color-text);
  line-height: ${24 / 16}rem;
  margin-left: 16px;
`;

const Desktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const Tablet = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    & {
      display: flex;
      align-items: center;
    }
  }
`;

const MobileBurgerWrapper = styled.div`
  margin-left: 20px;
`;

function NavigationBar({ social, clickHandler, checkboxRef, detailsHandler }) {
  return (
    <>
      <DesktopTabletWrapper>
        <SocialWrapper>
          <SocialLink href={social.twitter}>
            <Image
              src="/blog/twitter.svg"
              alt={""}
              width={30}
              height={30}
              loading={`eager`}
            />
          </SocialLink>
          <SocialLink href={social.github}>
            <Image
              src="/blog/github.svg"
              alt={""}
              width={30}
              height={30}
              loading={`eager`}
            />
          </SocialLink>
        </SocialWrapper>
        <NavBar>
          <Desktop>
            <Link href="/" passHref>
              <LinkText>blog</LinkText>
            </Link>
            <Link href="/diary" passHref>
              <LinkText>diary</LinkText>
            </Link>
            <Butterfly height={75} width={75} />
            <Link href="/about" passHref>
              <LinkText>about</LinkText>
            </Link>
          </Desktop>

          {clickHandler && checkboxRef ? (
            <Tablet>
              <BurgerIcon
                iconColor={"white"}
                clickHandler={clickHandler}
                checkboxRef={checkboxRef}
              />
              <Butterfly height={75} width={75} />
            </Tablet>
          ) : (
            ""
          )}

          <Collapse onClick={detailsHandler}>
            <Rotate>&gt;</Rotate>
            <CollapseTitle>projects</CollapseTitle>
            <CollapseEntry href={"https://niemal.github.io/portfolio#projects"}>
              <CollapseEntryImageWrapper>
                <Image
                  src="/blog/portfolio.png"
                  alt={"projects icon image"}
                  height={400}
                  width={400}
                  loading={`eager`}
                />
              </CollapseEntryImageWrapper>
              <CollapseEntryDetails>
                <CollapseEntryTitle>Portfolio</CollapseEntryTitle>
                <CollapseEntryDescription>
                  Explore my projects on my portfolio page!
                </CollapseEntryDescription>
              </CollapseEntryDetails>
            </CollapseEntry>
          </Collapse>
        </NavBar>
        <Filler />
      </DesktopTabletWrapper>

      <MobileWrapper>
        <SocialLink href={social.twitter}>
          <Image
            src="/blog/twitter.svg"
            alt={""}
            width={30}
            height={30}
            loading={`eager`}
          />
        </SocialLink>
        <SocialLink href={social.github}>
          <Image
            src="/blog/github.svg"
            alt={""}
            width={30}
            height={30}
            loading={`eager`}
          />
        </SocialLink>

        {clickHandler && checkboxRef ? (
          <MobileBurgerWrapper>
            <BurgerIcon
              iconColor={"white"}
              clickHandler={clickHandler}
              checkboxRef={checkboxRef}
              id={"toggle-burger-mobile"}
            />
          </MobileBurgerWrapper>
        ) : (
          ""
        )}

        <Butterfly height={75} width={75} />

        <Collapse onClick={detailsHandler}>
          <Rotate>&gt;</Rotate>
          <CollapseTitle>projects</CollapseTitle>
          <CollapseEntry href={"https://niemal.github.io/portfolio#projects"}>
            <CollapseEntryImageWrapper>
              <Image
                src="/blog/portfolio.png"
                alt={"projects icon image"}
                height={400}
                width={400}
                loading={`eager`}
              />
            </CollapseEntryImageWrapper>
            <CollapseEntryDetails>
              <CollapseEntryTitle>Portfolio</CollapseEntryTitle>
              <CollapseEntryDescription>
                Explore my projects on my portfolio page!
              </CollapseEntryDescription>
            </CollapseEntryDetails>
          </CollapseEntry>
        </Collapse>
      </MobileWrapper>
    </>
  );
}

export default NavigationBar;
