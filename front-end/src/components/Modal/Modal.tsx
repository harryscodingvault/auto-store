import React from "react";
import { Wrapper } from "./Modal.style";

interface ModalInterface {
  title: string;
  closeModal: (params: any) => any;
}

const Modal = ({ title, closeModal }: ModalInterface) => {
  return (
    <Wrapper>
      <div className="container">
        <h5 className="title">{title}</h5>
        <div className="btn-group">
          <div className="btn">
            <h5>Yes</h5>
          </div>
          <div className="btn" onClick={() => closeModal(false)}>
            <h5>No</h5>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
