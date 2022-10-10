import styled from "styled-components";
import { medium } from "../../utils/responsive";

export const Wrapper = styled.div`
  width: 96vw;
  max-width: var(--fixed-width);
  border: 1px solid var(--secondary-500);
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .title {
    padding: 0.1rem 0;
    border-bottom: 5px solid var(--secondary-500);
    color: var(--secondary-500);
  }
  .stats {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    .stat-group {
      display: flex;
      flex-direction: row
      flex: 1;
      span {
        color: var(--secondary-500);
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

  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    h5:nth-child(1) {
      color: var(--secondary-500);
    }
    h5:nth-child(2) {
      padding: 0 0.5rem;
    }
  }

  .edit-group {
    width: 95%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    ${medium({
      flexDirection: "row",
      justifyContent: "space-around",
    })}
    .btn {
      flex: 1;
      text-align: center;
      border: 1px solid var(--grey-50);
      background-color: var(--red-dark);
      h5 {
        color: var(--grey-50);
      }
      :hover {
        background-color: var(--red-light);
      }
      :active {
        background-color: var(--red-light);
      }
    }
  }
`;