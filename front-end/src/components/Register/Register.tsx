import React, { useState } from "react";
import { Wrapper } from "./Register.style";

import FormInput from "../FormComponents/FormInput/FormInput";

const initialValuesState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const initialErrorState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { username, email, password, confirm_password } = values;

    let newUsername = username.trim();

    if (newUsername.length > 20 || newUsername.length < 4) {
      setErrorMessages({
        ...errorMessages,
        username: "Username should be 4-20 characters",
      });
      return false;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrorMessages({
        ...errorMessages,
        email: "It should be a valid email address!",
      });
      return false;
    } else if (password.length < 8) {
      setErrorMessages({
        ...errorMessages,
        password: "It should be 8+ characters!",
      });

      return false;
    } else if (password !== confirm_password) {
      setErrorMessages({
        ...errorMessages,
        confirm_password: "Passwords do not match!",
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
          name="username"
          type="text"
          label="Username"
          required={true}
          errorMessage={errorMessages.username}
          value={values.username}
          handleChange={handleChange}
        />
        <FormInput
          name="email"
          type="text"
          label="Email"
          required={true}
          errorMessage={errorMessages.email}
          value={values.email}
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          required={true}
          errorMessage={errorMessages.password}
          value={values.password}
          handleChange={handleChange}
        />
        <FormInput
          name="confirm_password"
          type="password"
          label="Confirm Password"
          required={true}
          errorMessage={errorMessages.confirm_password}
          value={values.confirm_password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn">
          <h5>Register</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
