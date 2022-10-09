import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  border: 1px solid var(--secondary-500);
  color: var(--secondary-500);
  .btn-group {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    .sort-group {
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
  }
`;
