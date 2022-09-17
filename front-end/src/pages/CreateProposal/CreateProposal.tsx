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
  title: "",
  capacity: "",
  passing_vote_req: "",
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
    const { title, capacity, passing_vote_req } = values;
    if (!title.trim()) {
      setErrorMessages({ ...errorMessages, title: "A title is required!" });
      return false;
    }
    if (capacity < passing_vote_req) {
      setErrorMessages({
        ...errorMessages,
        capacity: "Capacity has to be bigger than passing votes!",
        passing_vote_req: "Capacity has to be bigger than passing votes!",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      console.log("register", { data: values });
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
          errorMessage={errorMessages.title}
          value={values.title}
          handleChange={handleChange}
        />
        <FormInput
          name="capacity"
          type="number"
          label="Capacity"
          min={1}
          required={true}
          errorMessage={errorMessages.capacity}
          value={values.capacity}
          handleChange={handleChange}
        />
        <FormInput
          name="passing_vote_req"
          type="number"
          label="Passing Vote"
          min={1}
          required={true}
          errorMessage={errorMessages.passing_vote_req}
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
