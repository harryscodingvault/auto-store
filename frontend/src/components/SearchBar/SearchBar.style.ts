import styled from "styled-components";
import { medium } from "../../utils/responsive";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border: 1px solid var(--secondary-500);
  margin-top: 1rem;
  input {
    width: 100%;
    height: 2.5rem;
    border: 0px;
    &:hover ~ ${".icon-container"} {
      background-color: var(--primary-400);
    }
    &:focus ~ ${".icon-container"} {
      background-color: var(--primary-700);
    }
  }
  .icon-container {
    padding: 0.4rem;
    .icon {
      width: 3rem;
      color: var(--secondary-500);
    }
  }
`;
