import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 5px solid var(--secondary-500);
    padding: 2.5rem 0;
    max-width: 100%;
  }
  .btn {
    margin-top: 1rem;
  }
`;
