import React, { useState, useEffect } from "react";
import { Wrapper } from "./CreateProposal.style";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormComponents/FormInput/FormInput";
import { getCurrentDay, getDatePlus30 } from "../../utils/datetime _management";
import { isAfter, isBefore } from "date-fns";
import { useDispatch } from "react-redux";
import { createProposal } from "../../redux/proposal/proposalSlice";

const getDay = getDatePlus30();

const initialValuesState = {
  title: "",
  time_req: getDay.currTime,
  date_req: getDay.currDay,
  capacity: 3,
};

const initialValuesOptions = [{ name: "yes" }, { name: "no" }];

const initialErrorState = {
  titleM: "",
  optionsM: [""],
  time_reqM: "",
  date_reqM: "",
  capacityM: "",
};

const CreateProposal = () => {
  const [values, setValues] = useState(initialValuesState);
  const [options, setOptions] = useState(initialValuesOptions);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };
  const arrayChangeHandler = (e: React.FormEvent, index: number) => {
    const value = (e.target as HTMLInputElement).value;
    const list = [...options];
    list[index] = { name: value };
    setOptions([...list]);
  };

  const checkValues = () => {
    const { title, time_req, date_req, capacity } = values;

    const inputDate = new Date(`${date_req} ${time_req}`);
    const thisDay = getCurrentDay();

    let verifiedData = true;
    let titleM = "",
      capacityM = "",
      optionsM = [""],
      time_reqM = "",
      date_reqM = "";

    if (!title.trim()) {
      verifiedData = false;
      titleM = "A title is required!";
    }

    if (!isBefore(thisDay.currDate, inputDate)) {
      verifiedData = false;
      date_reqM = "Future Date or Time required!";
      time_reqM = "Future Date or Time required!";
    }

    if (capacity < 2 || capacity > 100) {
      verifiedData = false;
      capacityM = "2=<capacity<=100";
    }
    options.map((item, index) => {
      if (options[index].name.trim() === "") {
        verifiedData = false;
        optionsM[index] = "Empty value";
      } else {
        optionsM[index] = "";
      }
    });

    setErrorMessages({
      ...errorMessages,
      titleM,
      optionsM,
      capacityM,
      time_reqM,
      date_reqM,
    });

    return verifiedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      const reqData = {
        title: values.title,
        deadline: new Date(
          `${values.date_req} ${values.time_req}`
        ).toISOString(),
        capacity: values.capacity,
        options: options,
      };
      dispatch(createProposal(reqData));
      setValues(initialValuesState);
      navigate("/workshop/private");
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
          label="Deadline Time"
          required={true}
          errorMessage={errorMessages.time_reqM}
          value={values.time_req}
          handleChange={handleChange}
        />
        <FormInput
          name="date_req"
          type="date"
          label="Deadline Date"
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
        <div className="option-list">
          <h5>Options</h5>
          {options.map((item, index) => (
            <div className="option-input" key={index}>
              <FormInput
                name={`option-${index}`}
                type="string"
                label={`Option ${index + 1}`}
                required={true}
                errorMessage={errorMessages.optionsM[index]}
                value={options[index].name}
                handleChange={(e) => arrayChangeHandler(e, index)}
              />
              {options.length > 2 && (
                <div
                  className="btn"
                  onClick={() =>
                    setOptions(options.filter((item, i) => i !== index))
                  }
                >
                  X
                </div>
              )}
            </div>
          ))}
        </div>
        {options.length < 100 && (
          <button
            type="button"
            className="btn"
            onClick={() => setOptions([...options, { name: "" }])}
          >
            <h5>New Option</h5>
          </button>
        )}
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
