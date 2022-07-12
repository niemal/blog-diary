import styled from "styled-components";

const NavWrapper = styled.nav`
  width: 100%;
`;

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  width: max-content;
  padding: 16px;
  gap: 12px;
  background-color: var(--color-secondary);
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const PageItem = styled.li`
  --primary-color: var(--color-primary);
  --secondary-color: var(--color-tertiary);
  --dark-color: var(--color-secondary);
`;

const PageItemLink = styled.a`
  text-decoration: none;
  padding: 8px;
  display: block;
  position: relative;
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: ${(p) => (p.active ? "var(--primary-color)" : "var(--color-text)")};
  border: 3px solid var(--dark-color);
  background-color: ${(p) =>
    p.active ? "var(--secondary-color)" : "var(--dark-color)"};
  border-radius: 8px;

  ${PageItem}:hover & {
    cursor: ${(p) => (p.active ? "default" : "pointer")};

    background-color: ${(p) =>
      p.active ? "var(--dark-color)" : "var(--secondary-color)"};
    border-color: ${(p) =>
      p.active ? "var(--primary-color)" : "var(--dark-color)"};
    /* color: ${(p) =>
      p.active ? "var(--primary-color)" : "var(--color-text)"}; */
    color: var(--primary-color);

    transition: ease-in-out 250ms;
  }
  ${PageItem}:focus & {
    outline-color: var(--secondary-color);
  }
`;

function Pagination({ current, iter, steps, pages, callback, parallax }) {
  let panel = [];

  if (iter - steps > 0) {
    panel.push(
      <PageItem key={`<=`}>
        <PageItemLink
          onClick={() => {
            callback(current, iter - steps, steps, pages);
            parallax?.current?.scrollTo(0.1);
          }}
        >
          &lt;=
        </PageItemLink>
      </PageItem>
    );
  }

  for (let i = iter; i < iter + steps && i <= pages.length; i++) {
    panel.push(
      <PageItem key={i}>
        <PageItemLink
          active={i === current}
          href={"#"}
          onClick={() => {
            callback(i, iter, steps, pages);
            parallax?.current?.scrollTo(0.1);
          }}
        >
          {i}
        </PageItemLink>
      </PageItem>
    );
  }

  if (iter + steps <= pages.length) {
    panel.push(
      <PageItem key={`=>`}>
        <PageItemLink
          onClick={() => {
            callback(current, iter + steps, steps, pages);
            parallax?.current?.scrollTo(0.1);
          }}
        >
          =&gt;
        </PageItemLink>
      </PageItem>
    );
  }

  return (
    <NavWrapper aria-label="Page navigation">
      <Wrapper>{panel}</Wrapper>
    </NavWrapper>
  );
}

export default Pagination;
