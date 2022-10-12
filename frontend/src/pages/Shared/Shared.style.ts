import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: var(--fixed-width);
  margin: auto;

  .title {
    padding: 0.1rem 0;
    border-bottom: 5px solid var(--secondary-500);
    color: var(--secondary-500);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    .cap-stats {
      display: flex;
      flex-direction: row;
    }
  }
  .stats {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    gap: 1rem;
    padding: 0 1rem;
    .stat-group {
      display: flex;
      flex-direction: row;
      width: 100%;

      span {
        color: var(--secondary-500);
        margin-right: 0.1rem;
      }
    }
  }
  .list-options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    .option-item {
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      display: flex;
      flex-direction: row;
      border: 1px solid var(--secondary-500);
      width: 95%;
      cursor: pointer;
      :hover {
        p:nth-child(2) {
          background-color: var(--secondary-800);
        }
      }
      :active {
        p:nth-child(2) {
          background-color: var(--secondary-700);
        }
      }
      p:nth-child(1) {
        border-right: 1px solid var(--secondary-500);
        padding: 0 0.5rem;
        color: var(--secondary-500);
      }
      p:nth-child(2) {
        width: 100%;
        padding: 0 0.5rem;
      }
    }
    .selected {
      p:nth-child(2) {
        background-color: var(--secondary-700);
      }
    }
  }
`;
