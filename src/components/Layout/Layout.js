import Link from "next/link";
import styled from "styled-components";
import MetaHeader from "../MetaHeader";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";
import { ButterflySticky } from "../ButterflyImages";
import { BurgerModal } from "../Burger";
import { useState, useRef } from "react";

const Main = styled.main`
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const Content = styled.div`
  ${(p) => (p.grid ? "display: grid" : "")};
  ${(p) => (p.grid ? "place-content: center" : "")};
  flex: 1;
`;

export default function Layout({
  title = "Welcome to niemalground!",
  url = "",
  desc = "",
  imageUrl = "",
  social = {},
  preload = [],
  overflow = "visible",
  grid = undefined,
  children,
}) {
  const [burger, setBurger] = useState(false);
  const handler = () => {
    setBurger((prev) => !prev);
  };
  const burgerCheckbox = useRef(null);

  return (
    <>
      <MetaHeader
        title={title}
        url={url}
        desc={desc}
        imageUrl={imageUrl}
        preload={preload}
      />

      <Main>
        <NavigationBar
          social={social}
          clickHandler={handler}
          checkboxRef={burgerCheckbox}
          detailsHandler={() => {
            setBurger(false);
            burgerCheckbox.current.checked = false;
          }}
        />

        {burger ? (
          <BurgerModal backgroundColor={"var(--color-primary)"}>
            <Link href={"/blog"} text={"blog"} />
            <Link href={"/blog/diary"} text={"diary"} />
            <Link href={"/blog/about"} text={"about"} />
          </BurgerModal>
        ) : (
          ""
        )}

        <Content grid={grid}>{children}</Content>

        <Footer />
        <ButterflySticky overflow={overflow} />
      </Main>
    </>
  );
}
