import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 5px solid var(--secondary-500);
    padding: 2.5rem 0;
    max-width: 100%;
  }
  .btn-group {
    display: flex;
    margin-top: 1rem;
    width: 90%;
    .btn {
      flex: 1;
    }
  }
`;
