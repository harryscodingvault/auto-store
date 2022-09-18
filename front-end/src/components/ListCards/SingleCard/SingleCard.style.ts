import styled from "styled-components";
import { medium } from "../../../utils/responsive";

export const Wrapper = styled.div`
  max-width: 600px;
  width: 100vw;
  border: 1px solid var(--secondary-500);
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .title {
    padding: 0.1rem 0;
    border-bottom: 5px solid var(--secondary-500);
    color: var(--secondary-500);
  }
  .creator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    span {
      color: var(--secondary-500);
    }
  }
  .data-group {
    thead > tr > th {
      border: 1px solid var(--secondary-500);
    }
    tbody > tr > td {
      border: 1px solid var(--secondary-500);
      text-align: center;
    }
  }
  .result {
    text-align: center;
    .positive {
      background-color: var(--primary-500);
      color: var(--secondary-500);
    }
    .negative {
      background-color: var(--red-dark);
      color: var(--secondary-500);
    }
  }
  .button-group {
    display: flex;
    flex-direction: column;
    ${medium({ flexDirection: "row", justifyContent: "space-around" })}
    .btn {
      flex: 1;
      text-align: center;
    }
  }
  .edit-group {
    display: flex;
    flex-direction: column;
    ${medium({ flexDirection: "row", justifyContent: "space-around" })}
    .btn {
      flex: 1;
      text-align: center;
      border-color: var(--red-dark);
      h5 {
        color: var(--red-dark);
      }
      :active {
        border-color: var(--primary-900);
        h5 {
          color: var(--primary-900);
        }
      }
    }
  }
`;
