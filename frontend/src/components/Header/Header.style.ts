import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
  max-width: 600px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  .nav {
    border-top: 1px solid var(--secondary-900);
    border-bottom: 1px solid var(--secondary-500);
    border-left: 0.5px solid var(--secondary-500);
    border-right: 0.5px solid var(--secondary-500);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    transition: 0.1s ease;
    color: var(--secondary-500);
    padding: 0.5rem 0;
    :nth-child(1) {
      border-left: 1px solid var(--secondary-500);
    }
    :nth-child(3) {
      border-right: 1px solid var(--secondary-500);
    }
    &:hover {
      border-bottom: 1px solid var(--secondary-900);
      border-top: 1px solid var(--secondary-500);
    }
  }
  .active-nav {
    border-bottom: 1px solid var(--secondary-900);
    border-top: 1px solid var(--secondary-500);
  }
`;
