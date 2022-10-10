import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  border: 1px solid var(--secondary-500);
  color: var(--secondary-500);
  .sorting {
    display: flex;
    flex-direction: row;
    .select-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .sort-req {
        cursor: pointer;
        border-left: 1px solid var(--secondary-500);
        border-right: 1px solid var(--secondary-500);
        padding: 0 1rem;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        background-color: var(--secondary-300);
        color: var(--primary-800);
        :hover {
          background-color: var(--secondary-500);
        }
        :active {
          background-color: var(--secondary-700);
        }
        h5 {
          text-transform: none;
        }
      }

      .select-sorts {
        display: flex;
        flex-direction: column;
        position: absolute;
        margin-top: 2rem;
        background-color: var(--primary-900);
        border: 1px solid var(--secondary-500);

        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        gap: 0.5rem;
        .select-btn {
          padding: 1rem;
          border-bottom: 1px solid var(--primary-900);
          border-top: 1px solid var(--primary-900);
          :hover {
            border-bottom: 1px solid var(--secondary-500);
            border-top: 1px solid var(--secondary-500);
            background-color: var(--primary-700);
          }
          :active {
            background-color: var(--primary-500);
          }
        }
      }
    }
  }
`;
