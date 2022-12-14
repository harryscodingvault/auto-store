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

  .result {
    width: 90%;
    margin: auto;
    text-align: center;

    th {
      color: var(--secondary-500);
      border: 1px solid var(--secondary-500);
    }
  }

  .edit-group {
    width: 95%;
    margin: auto;
    display: flex;
    flex-direction: row;
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
      color: var(--secondary-500);
      font-size: 1rem;

      .icon {
        font-size: 1.2rem;
        margin: 0;
        vertical-align: middle;
      }
      :hover {
        background-color: var(--secondary-500);
        color: var(--primary-500);
      }
      :active {
        background-color: var(--secondary-100);
      }
    }
  }
  .qr-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .qr-code {
      border: 10px solid var(--secondary-500);
      cursor: pointer;
      &:hover {
        border-color: var(--primary-500);
      }
      &:active {
        border-color: var(--primary-200);
      }
    }
    .alert-success {
      width: 50%;
    }
  }
`;
