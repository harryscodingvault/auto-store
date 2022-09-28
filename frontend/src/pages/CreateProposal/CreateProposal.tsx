import React, { useState, useEffect } from "react";
import { Wrapper } from "./CreateProposal.style";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormComponents/FormInput/FormInput";

const initialValuesState = {
  title: "",
  options: ["yes", "no"],
  time_req: "00:30",
  date_req: "",
  capacity: 10,
};

const initialErrorState = {
  titleM: "",
  optionsM: [],
  time_reqM: "",
  date_reqM: "",
  capacityM: "",
};

const CreateProposal = () => {
  const [values, setValues] = useState(initialValuesState);
  const [proposals, setProposals] = useState([]);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };
  const arrayHandler = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
  };

  const checkValues = () => {
    const { title, options, time_req, date_req, capacity } = values;

    let verifiedData = true;
    let titleM = "";

    if (!title.trim()) {
      verifiedData = false;
      titleM = "A title is required!";
    }

    setErrorMessages({
      ...errorMessages,
      titleM,
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
          name="time_req"
          type="time"
          label="Time"
          required={true}
          errorMessage={errorMessages.time_reqM}
          value={values.time_req}
          handleChange={handleChange}
        />
        <FormInput
          name="date"
          type="date"
          label="Date"
          required={true}
          errorMessage={errorMessages.date_reqM}
          value={values.date_req}
          handleChange={handleChange}
        />
        <FormInput
          name="capacity"
          type="number"
          min={2}
          label="Capacity"
          required={true}
          errorMessage={errorMessages.capacityM}
          value={values.capacity}
          handleChange={handleChange}
        />

        <h5>Options</h5>
        {values.options.map((item, index) => (
          <div className="option-input" key={index}>
            <FormInput
              name={`${index}`}
              type="string"
              label={`Option ${index + 1}`}
              required={true}
              errorMessage={errorMessages.capacityM}
              value={values.options[index]}
              handleChange={handleChange}
            />
            {values.options.length > 2 && (
              <div
                className="btn"
                onClick={() =>
                  setValues({
                    ...values,
                    options: values.options.filter((item, i) => i !== index),
                  })
                }
              >
                X
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn"
          onClick={() =>
            setValues({ ...values, options: [...values.options, ""] })
          }
        >
          <h5>New Option</h5>
        </button>

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
