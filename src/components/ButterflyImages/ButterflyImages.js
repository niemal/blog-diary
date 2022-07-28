import Image from "next/image";
import styled from "styled-components";
import { QUERIES } from "../constants";

const ButterflyWrapper = styled.div`
  position: relative;
`;

export function Butterfly({ width = 600, height = 600 }) {
  return (
    <ButterflyWrapper>
      <Image
        src={`/blog/butterfly.svg`}
        alt={""}
        width={width}
        height={height}
        loading={`eager`}
      />
    </ButterflyWrapper>
  );
}

export function Butterfly2({ width = 600, height = 600 }) {
  return (
    <ButterflyWrapper>
      <Image
        src={`/blog/butterfly-2.svg`}
        alt={""}
        width={width}
        height={height}
        loading={`eager`}
      />
    </ButterflyWrapper>
  );
}

const FixedWrapper = styled.div`
  position: absolute;
  overflow: var(--overflow);
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;

  @media ${QUERIES.tabletAndSmaller} {
    position: fixed;
  }
`;
const RelativeWrapper = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
`;

const BackgroundHalfOneWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 120px;
  height: 50%;

  @media ${QUERIES.tabletAndSmaller} {
    left: -48px;
    top: -128px;
  }
`;
const BackgroundHalfTwoWrapper = styled(BackgroundHalfOneWrapper)`
  top: 50%;
  right: 0;
  bottom: 0;
  left: auto;

  @media ${QUERIES.tabletAndSmaller} {
    top: 128px;
    right: -264px;
  }
`;

const ButterflyImageOneWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 550px;
  height: 500px;
  max-width: 60%;

  & > span img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`;

const ButterflyImageTwoWrapper = styled(ButterflyImageOneWrapper)`
  transform: scaleX(-1);
  height: 800px;
  max-width: 85%;
`;

export function ButterflySticky({ overflow }) {
  return (
    <FixedWrapper style={{ "--overflow": overflow }}>
      <RelativeWrapper>
        <BackgroundHalfOneWrapper>
          <ButterflyImageOneWrapper>
            <Image
              src={`/blog/butterfly.svg`}
              width={550}
              height={500}
              loading={`eager`}
            />
          </ButterflyImageOneWrapper>
        </BackgroundHalfOneWrapper>
        <BackgroundHalfTwoWrapper>
          <ButterflyImageTwoWrapper>
            <Image
              src={`/blog/butterfly.svg`}
              width={550}
              height={800}
              loading={`eager`}
            />
          </ButterflyImageTwoWrapper>
        </BackgroundHalfTwoWrapper>
      </RelativeWrapper>
    </FixedWrapper>
  );
}
