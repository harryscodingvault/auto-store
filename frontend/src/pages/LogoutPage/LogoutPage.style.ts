import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10rem;
  gap: 2rem;
  h5 {
    color: var(--secondary-500);
  }
  .btn-group {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    .btn {
      text-align: center;
      width: 6rem;
    }
  }
`;
