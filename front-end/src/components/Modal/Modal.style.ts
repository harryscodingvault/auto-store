import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  background-color: var(--primary-900);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
  .container {
    border: 1px solid var(--secondary-500);
    padding: 5rem;
    .title {
      margin-bottom: 2rem;
    }
    .btn-group {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn {
        flex: 1;
      }
    }
  }
`;
