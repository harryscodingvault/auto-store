import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vh;

  height: 100vh;
  background-color: var(--primary-900);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    max-width: 90vw;
    border: 1px solid var(--secondary-500);
    padding: 2rem;
    .title {
      margin-bottom: 2rem;
      color: var(--secondary-500);
    }
    .btn-group {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      gap: 2rem;
      .btn {
        flex: 1;
        text-align: center;
      }
    }
  }
`;
