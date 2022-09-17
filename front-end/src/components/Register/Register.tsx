import React, { useState, useEffect } from "react";
import { Wrapper } from "./Register.style";

import FormInput from "../FormComponents/FormInput/FormInput";

const initialValuesState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const initialErrorState = {
  usernameM: "",
  emailM: "",
  passwordM: "",
  confirm_passwordM: "",
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

    let verifiedData = true;
    let usernameM = "",
      emailM = "",
      passwordM = "",
      confirm_passwordM = "";

    if (newUsername.length > 20 || newUsername.length < 4) {
      verifiedData = false;
      usernameM = "Username should be 4-20 characters!";
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      verifiedData = false;
      emailM = "It should be a valid email address!";
    }
    if (password.length < 8) {
      verifiedData = false;
      passwordM = "It should be 8+ characters!";
    }
    if (password !== confirm_password) {
      verifiedData = false;
      confirm_passwordM = "Passwords do not match!";
    }
    setErrorMessages({
      ...errorMessages,
      usernameM,
      emailM,
      passwordM,
      confirm_passwordM,
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
          name="username"
          type="text"
          label="Username"
          required={true}
          errorMessage={errorMessages.usernameM}
          value={values.username}
          handleChange={handleChange}
        />
        <FormInput
          name="email"
          type="text"
          label="Email"
          required={true}
          errorMessage={errorMessages.emailM}
          value={values.email}
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          required={true}
          errorMessage={errorMessages.passwordM}
          value={values.password}
          handleChange={handleChange}
        />
        <FormInput
          name="confirm_password"
          type="password"
          label="Confirm Password"
          required={true}
          errorMessage={errorMessages.confirm_passwordM}
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
