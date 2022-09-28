import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import { Wrapper } from "./EditProposal.style";

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

const EditProposal = () => {
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

    let verifiedData = true;
    let titleM = "",
      capacityM = "",
      passing_vote_reqM = "";

    if (!title.trim()) {
      verifiedData = false;
      titleM = "A title is required!";
    }
    if (capacity < passing_vote_req) {
      verifiedData = false;
      capacityM = "Capacity has to be bigger than passing votes!";
      passing_vote_reqM = "Capacity has to be bigger than passing votes!";
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
            <h5>Edit</h5>
          </button>
          <button type="button" className="btn" onClick={() => navigate(-1)}>
            <h5>Cancel</h5>
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditProposal;
