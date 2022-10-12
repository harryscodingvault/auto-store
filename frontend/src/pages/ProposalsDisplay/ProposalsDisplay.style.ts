import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 96vw;
  max-width: var(--fixed-width);
  .not-found {
    text-align: center;
    color: var(--secondary-500);
    margin-top: 5rem;
  }
  .list {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 1rem;
  }
`;
