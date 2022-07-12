import styled from "styled-components";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  width: 50px;
  height: 40px;
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
  }
`;

const BurgerWrapper = styled.label`
  position: absolute;
  cursor: pointer;
  margin: auto;
  width: 50px;
  height: 40px;
`;

const BurgerIconDiv = styled.div`
  background: var(--icon-color);
  width: 50px;
  height: 5px;
  border-radius: 50%;
  position: relative;
  transition: var(--icon-color) 10ms 150ms ease;
  transform: translateY(20px);

  &:before,
  &:after {
    transition: top 150ms 200ms ease, transform 200ms 50ms ease;
    position: absolute;
    background: var(--icon-color);
    width: 50px;
    height: 5px;
    border-radius: 50%;
    content: "";
  }
  &:before {
    top: -12px;
  }
  &:after {
    top: 12px;
  }
`;

const MenuTrigger = styled.input.attrs({
  type: "checkbox",
})`
  display: none;

  &:checked ~ ${BurgerWrapper} ${BurgerIconDiv} {
    background: transparent;

    &:after,
    &:before {
      transition: top 150ms 50ms ease, transform 150ms 350ms ease;
      top: 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;

export function BurgerIcon({
  iconColor = "white",
  checkboxRef,
  clickHandler,
  id = "toggle-burger",
}) {
  return (
    <Wrapper>
      <MenuTrigger id={id} ref={checkboxRef} onClick={clickHandler} />
      <BurgerWrapper htmlFor={id}>
        <BurgerIconDiv
          style={{
            "--icon-color": iconColor,
          }}
        />
      </BurgerWrapper>
    </Wrapper>
  );
}
