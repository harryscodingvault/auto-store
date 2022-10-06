import React, { useState, useEffect } from "react";
import { Wrapper } from "./CreateProposal.style";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormComponents/FormInput/FormInput";

const initialValuesState = {
  title: "",
  capacity: 2,
  passing_vote_req: 1,
};

const initialErrorState = {
  titleM: "",
  capacityM: "",
  passing_vote_reqM: "",
};

const CreateProposal = () => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { title, capacity } = values;

    let verifiedData = true;
    let titleM = "",
      capacityM = "",
      passing_vote_reqM = "";

    if (!title.trim()) {
      verifiedData = false;
      titleM = "A title is required!";
    }
    if (capacity < 2) {
      verifiedData = false;
      capacityM = "Capacity has to be bigger than 2!";
    }
    setErrorMessages({
      ...errorMessages,
      titleM,
      capacityM,
      passing_vote_reqM,
    });

    return verifiedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      console.log("register", {});
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <FormInput
          name="title"
          type="text"
          label="Title"
          required={true}
          errorMessage={errorMessages.titleM}
          value={values.title}
          handleChange={handleChange}
        />
        <FormInput
          name="capacity"
          type="number"
          label="Capacity"
          min={1}
          required={true}
          errorMessage={errorMessages.capacityM}
          value={values.capacity}
          handleChange={handleChange}
        />
        <FormInput
          name="passing_vote_req"
          type="number"
          label="Passing Vote"
          min={1}
          required={true}
          errorMessage={errorMessages.passing_vote_reqM}
          value={values.passing_vote_req}
          handleChange={handleChange}
        />
        <div className="btn-group">
          <button type="submit" className="btn">
            <h5>Create</h5>
          </button>
          <button type="button" className="btn" onClick={() => navigate(-1)}>
            <h5>Cancel</h5>
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default CreateProposal;
