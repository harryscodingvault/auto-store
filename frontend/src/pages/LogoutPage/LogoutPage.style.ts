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
    .option-list {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin-bottom: 1rem;
      margin-top: 1rem;
      h5 {
        color: var(--secondary-500);
        text-align: center;
      }
      .option-input {
        display: flex;
        flex-direction: row;

        .form-input {
          width: 100%;
        }
        .btn {
          background-color: var(--red-dark);
          color: var(--secondary-500);
          height: 2.2rem;
          display: flex;
          align-items: center;
          align-self: flex-end;
          :hover {
            background-color: var(--red-light);
            border-color: var(--secondary-500);
          }
          :active {
            background-color: var(--red-light);
            border-color: var(--secondary-500);
          }
        }
      }
    }
  }
  .btn-group {
    display: flex;
    margin-top: 1rem;
    width: 90%;
    gap: 0.5rem;
    .btn {
      flex: 1;
    }
  }
`;
