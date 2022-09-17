import React, { useState } from "react";
import { Wrapper } from "./Login.style";

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

const Login = () => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { email, password } = values;

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
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
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      console.log("login", { data: values });
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
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

        <button type="submit" className="btn">
          <h5>Login</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default Login;
