import styled from "styled-components";

const SpanHover = styled.span`
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: var(--color-text);
  transition: color 150ms ease-in-out;

  &:hover {
    color: var(--color-tertiary);
  }

  &:after {
    content: "";
    height: 2px;
    width: 0;
    background: transparent;
    transition: width 0.5s ease, background-color 0.5s ease;

    position: absolute;
    bottom: -3px;
    left: 0;
  }

  &:hover:after {
    width: 100%;
    background: var(--color-tertiary);
  }
`;

export default SpanHover;
