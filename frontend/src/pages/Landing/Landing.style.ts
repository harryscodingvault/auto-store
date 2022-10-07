import styled from "styled-components";

export const Wrapper = styled.div`
  margin: auto;
  margin-top: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 30rem;
  width: 100%;
  ul {
    color: var(--secondary-500);
  }
  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .google-btn {
      border: 1px solid var(--secondary-500);
      background-color: var(--red-dark);
      > h5 {
        color: var(--secondary-500);
      }
      :hover {
        background-color: var(--secondary-500);
        border: 1px solid var(--red-dark);
        > h5 {
          color: var(--red-dark);
        }
      }
      :active {
        background-color: var(--secondary-100);
        border: 1px solid var(--red-dark);
        > h5 {
          color: var(--red-dark);
        }
      }
    }
  }
`;
