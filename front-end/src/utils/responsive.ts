import { css } from "styled-components";

export const small = (props: any) => {
  return css`
    @media only screen and (min-width: 380px) {
      ${props}
    }
  `;
};

export const medium = (props: any) => {
  return css`
    @media only screen and (min-width: 600px) {
      ${props}
    }
  `;
};

export const large = (props: any) => {
  return css`
    @media only screen and (min-width: 800px) {
      ${props}
    }
  `;
};
