import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--fixed-width);
  margin: auto;
  margin-top: 5rem;

  .link-text {
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--secondary-500);
    :hover {
      color: var(--secondary-300);
    }
    :active {
      color: var(--secondary-100);
    }
  }
`;
