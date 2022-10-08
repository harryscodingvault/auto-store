import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: var(--fixed-width);
  height: 100%;
  background-color: var(--primary-900);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    border: 1px solid var(--secondary-500);
    padding: 5rem;
    .title {
      margin-bottom: 2rem;
      color: var(--secondary-500);
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
