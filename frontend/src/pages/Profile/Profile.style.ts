import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  gap: 2rem;
  .text-group {
    .title {
      display: flex;
      align-items: flex-start;
      color: var(--secondary-500);
    }
    .info {
      text-transform: none;
    }
  }
  .btn-group {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    .btn {
      text-align: center;
      width: 8rem;
    }
  }
`;
