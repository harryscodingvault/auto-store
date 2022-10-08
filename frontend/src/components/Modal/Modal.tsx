import React from "react";
import { Wrapper } from "./Modal.style";

interface ModalInterface {
  title: string;
  ModalOn: (params: any) => any;
  Action: (params: any) => any;
}

const Modal = ({ title, ModalOn, Action }: ModalInterface) => {
  return (
    <Wrapper>
      <div className="container">
        <h5 className="title">{title}</h5>
        <div className="btn-group">
          <div className="btn" onClick={Action}>
            <h5>Yes</h5>
          </div>
          <div className="btn" onClick={() => ModalOn(false)}>
            <h5>No</h5>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
