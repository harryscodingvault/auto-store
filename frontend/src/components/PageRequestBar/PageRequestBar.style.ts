import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5em;

  .page-btn-list {
    display: flex;
    flex-direction: row;
    gap: 0.5em;

    .pageOn {
      background-color: var(--secondary-500);
      h5 {
        color: var(--primary-800);
      }
    }
  }
`;
