import styled, { keyframes } from "styled-components";
import { QUERIES } from "../constants";

const slideIn = keyframes`
  from {
    opacity: 0.7;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: 78px;
  left: 0;
  width: 100%;
  height: 30vh;
  z-index: 400;
  overflow: hidden;
  isolation: isolate;

  animation: ${slideIn} 350ms ease-in-out;

  @media ${QUERIES.tabletAndSmaller} {
    height: 45vh;
  }
  @media ${QUERIES.phoneAndSmaller} {
    height: 30vh;
  }
`;

const Menu = styled.div`
  position: relative;
  padding: 32px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  border-radius: 0px 0px 32px 32px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const MenuDecoration = styled.img`
  position: absolute;
  filter: drop-shadow(4px 3px 1px var(--color-tertiary));
  width: 400px;
  height: 400px;
  transform: rotate(35deg) scaleX(-1);
  top: -20%;
  right: -5%;

  @media ${QUERIES.phoneAndSmaller} {
    right: -35%;
  }
`;

const MenuEntry = styled.a`
  text-decoration: none;
  color: var(--color-text);
  border: 3px solid var(--color-tertiary);
  font-weight: var(--font-weight-bold);
  background-color: var(--color-background);
  text-align: center;
  border-radius: 8px;
  margin: 8px 0;
  padding: 8px 40px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

export function BurgerModal({ backgroundColor, children }) {
  return (
    <MenuWrapper>
      <Menu
        style={{
          "--background-color": backgroundColor,
        }}
      >
        <MenuDecoration src={"/blog/butterfly.svg"} />
        {children.map((child, idx) => (
          <MenuEntry key={idx} href={child.props.href}>
            {child.props.text}
          </MenuEntry>
        ))}
      </Menu>
    </MenuWrapper>
  );
}
