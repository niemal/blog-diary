import styled from "styled-components";
import Button from "../Button";

// import uuid from "uuid";
import { v4 as uuid } from "uuid";
import { animated, useTransition } from "react-spring";
import { QUERIES } from "../constants";
import { CollapseContext } from "../MobileIndex";
import { useContext } from "react";

const DesktopTags = styled.div`
  display: grid;
  max-width: 250px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-items: center;
  gap: 16px 0px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const TagWrapper = styled.div`
  opacity: 0.9;
  border: 3px solid;
  border-color: ${(p) =>
    p.enabled ? "var(--color-secondary)" : "var(--color-tertiary)"};
  font-weight: var(--font-weight-medium);
  text-shadow: 2px 2px 4px hsl(0deg 0% 0% / 0.7);
  border-radius: 8px;
  color: var(--color-text);

  background: ${(p) =>
    p.enabled
      ? `linear-gradient(
      90deg, var(--color-info) 5%,
      var(--color-tertiary) 25%,
      var(--color-info) 65%,
      var(--color-tertiary) 100%
    )`
      : `linear-gradient(
      90deg, var(--color-primary) 5%,
      var(--color-secondary) 25%,
      var(--color-primary) 65%,
      var(--color-secondary) 100%
    )`};

  padding: 8px;
  cursor: pointer;
  transition: opacity border-color 250ms ease-in-out;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 10px var(--color-tertiary);
    border-color: var(--color-info);
  }
`;

const PhoneTags = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
    width: 100%;
  }
`;

const CollapseWrapper = styled.div`
  display: ${(p) => (p.collapse ? "grid" : "none")};
  position: relative;
  top: 0;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  text-align: center;
  gap: 16px;
  border: 7px solid var(--color-info);
  border-top: 0;
  padding: 8px 24px 24px 24px;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 1px 4px 5px var(--color-gray-800);
  background-color: var(--color-background);
  overflow: hidden;
`;

export function TagsButton({ collapse, clickHandler }) {
  return (
    <Button type={`button`} onClick={clickHandler}>
      {collapse ? "close" : "tags"}
    </Button>
  );
}

export default function Tags({ tags, callback, parallax }) {
  const context = useContext(CollapseContext);

  let collapse = null;
  if (context) {
    collapse = context.collapse;
  }

  let propz = {
    from: { opacity: 0, transform: "scaleY(0)", maxHeight: "0px" },
    enter: { opacity: 1, transform: "scaleY(1)", maxHeight: "1000px" },
    leave: { opacity: 0, transform: "scaleY(0)", maxHeight: "0px" },
  };
  const transitions = useTransition(collapse ? tags : [], propz);
  const transition = useTransition(collapse, propz);

  return (
    <>
      <DesktopTags>
        {tags.map((tag, index) => (
          <TagWrapper
            key={`${tag}-${index}`}
            enabled={tag[1] === "enabled"}
            onClick={() => {
              callback(tag);
              parallax?.current?.scrollTo(0.1);
            }}
          >
            {tag[0]}
          </TagWrapper>
        ))}
      </DesktopTags>

      <PhoneTags>
        {transition((props, collapse) => (
          <animated.div style={props}>
            <CollapseWrapper collapse={collapse}>
              {transitions((props, tag) => (
                <animated.div
                  key={uuid()}
                  style={props}
                  onClick={() => {
                    callback(tag);
                    parallax?.current?.scrollTo(0.1);
                  }}
                >
                  <TagWrapper enabled={tag[1] === "enabled"}>
                    {tag[0]}
                  </TagWrapper>
                </animated.div>
              ))}
            </CollapseWrapper>
          </animated.div>
        ))}
      </PhoneTags>
    </>
  );
}
