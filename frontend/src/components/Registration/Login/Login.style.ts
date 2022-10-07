import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid var(--secondary-500);
    padding: 2.5rem 0;
    max-width: 100%;

    .btn-group {
      display: flex;
      margin-top: 1rem;
      width: 90%;
      gap: 0.5rem;
      .btn {
        flex: 1;
      }
    }
  }
`;
