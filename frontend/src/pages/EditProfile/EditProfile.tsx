import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import { Wrapper } from "./EditProfile.style";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../redux/user/userSlice";

const initialErrorState = {
  usernameM: "",
  emailM: "",
  passwordM: "",
  confirm_passwordM: "",
};

const EditProfile = () => {
  const { user, isLoading, errorMessage } = useSelector(
    (store: any) => store.user
  );

  const initialValuesState = {
    username: user.payload.username || null,
    email: user.payload.email || null,
    password: "",
    confirm_password: "",
  };
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { username, email, password, confirm_password } = values;

    let verifiedData = true;
    let usernameM = "",
      emailM = "",
      passwordM = "",
      confirm_passwordM = "";

    if (username.length < 8) {
      verifiedData = false;
      usernameM = "Username has to be bigger than 8 characters!";
    }

    if (!validator.isEmail(email)) {
      verifiedData = false;
      emailM = "An email is required!";
    }
    if (password.length < 8) {
      verifiedData = false;
      passwordM = "Password has to be bigger than 8 characters!";
    }
    if (confirm_password !== password) {
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
      const req_values = {
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      };

      dispatch(editUser(req_values));
      navigate("/account/profile");
      return;
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h5 className="form-title">Update Account</h5>
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
        <FormInput
          name="confirm_password"
          type="password"
          label="Confirm Password"
          required={true}
          errorMessage={errorMessages.confirm_passwordM}
          value={values.confirm_password}
          handleChange={handleChange}
        />

        <div className="btn-group">
          <button type="submit" className="btn">
            <h5>Update</h5>
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

export default EditProfile;
