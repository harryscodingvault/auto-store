import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import FormInput from "../../FormComponents/FormInput/FormInput";
import { Wrapper } from "./Login.style";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../redux/user/userSlice";

const initialValuesState = {
  email: "",
  password: "",
};

const initialErrorState = {
  emailM: "",
  passwordM: "",
};

const Login = () => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const navigate = useNavigate();
  const { user, isLoading, errorMessage } = useSelector(
    (store: any) => store.user
  );
  const dispatch = useDispatch();

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { email, password } = values;

    let verifiedData = true;
    let emailM = "",
      passwordM = "";

    if (!validator.isEmail(email)) {
      verifiedData = false;
      emailM = "An email is required!";
    }
    if (password.length < 8) {
      verifiedData = false;
      passwordM = "Password is too short!";
    }

    setErrorMessages({
      ...errorMessages,
      emailM,
      passwordM,
    });

    return verifiedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      const req_values = {
        email: values.email.trim(),
        password: values.password.trim(),
      };
      dispatch(loginUser(req_values));
      return;
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h5 className="form-title">Login</h5>
        <FormInput
          name="email"
          type="email"
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

        <div className="btn-group">
          <button type="submit" className="btn">
            <h5>Login</h5>
          </button>

          <button type="button" className="btn" onClick={() => navigate(-1)}>
            <h5>Cancel</h5>
          </button>
        </div>
        {isLoading && <div className="spinner"></div>}
      </form>
    </Wrapper>
  );
};

export default Login;
