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

const ButterflyImageOne = styled.img`
  position: sticky;
  top: 0;
  width: 550px;
  height: 500px;
  max-width: 60%;
`;

const ButterflyImageTwo = styled(ButterflyImageOne)`
  transform: scaleX(-1);
  height: 800px;
  max-width: 85%;
`;

export function ButterflySticky({ overflow }) {
  return (
    <FixedWrapper style={{ "--overflow": overflow }}>
      <RelativeWrapper>
        <BackgroundHalfOneWrapper>
          <ButterflyImageOne src={`/blog/butterfly.svg`}></ButterflyImageOne>
        </BackgroundHalfOneWrapper>
        <BackgroundHalfTwoWrapper>
          <ButterflyImageTwo src={`/blog/butterfly.svg`}></ButterflyImageTwo>
        </BackgroundHalfTwoWrapper>
      </RelativeWrapper>
    </FixedWrapper>
  );
}
