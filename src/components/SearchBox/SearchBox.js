import styled from "styled-components";

const SearchBox = styled.input`
  width: 75%;
  padding: 8px;
  font-size: ${22 / 16}rem;
  font-weight: var(--font-weight-bold);
  border: 5px solid var(--color-secondary);
  border-radius: 8px;
  background-color: var(--color-primary);
  color: var(--color-text);
  z-index: 2;

  &::placeholder {
    text-align: center;
    color: var(--color-text);
  }
  &:focus {
    background-color: var(--color-info);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:focus::placeholder {
    color: var(--color-gray-800);
  }
`;

export default SearchBox;
