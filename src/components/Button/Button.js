import styled from "styled-components";

const Button = styled.button`
  border: 3px solid var(--color-tertiary);
  border-radius: 8px;
  font-size: ${20 / 16}rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  padding: 6px 32px;
  background-color: var(--color-secondary);
  cursor: pointer;
  transition: background-color border-color color 350ms ease-in-out;

  &:hover {
    background-color: var(--color-secondary);
    border-color: var(--color-info);
    color: var(--color-tertiary);
  }
`;

export default Button;
