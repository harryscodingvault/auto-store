import styled from "styled-components";

export const Wrapper = styled.div`
  color: var(--secondary-500);
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ul {
    span {
      color: var(--red-dark);
      font-size: 1.5rem;
    }
  }
  .btn {
    width: 250px;
    margin: 1rem;
    display: flex;
    flex-direction: row;
  }
`;
