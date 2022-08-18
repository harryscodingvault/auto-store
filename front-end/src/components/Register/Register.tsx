import React from "react";
import { Wrapper } from "./Register.style";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "../../components/FormRow/FormRow";

const schema = yup.object().shape({
  email: yup.string().email().required("Email required"),
  password: yup.string().min(8).required(),
  confirm_password: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
  username: yup.string().min(4).max(50),
});

interface FormInterface {
  email: string;
  password: string;
  confirm_password?: string;
  username?: string;
}

const Register = () => {
  const FormMethods = useForm<FormInterface>({ resolver: yupResolver(schema) });

  const { handleSubmit } = FormMethods;

  const formSubmitHandler: SubmitHandler<FormInterface> = (
    data: FormInterface
  ) => {
    console.log("register", { data });
  };

  return (
    <Wrapper>
      <FormProvider {...FormMethods}>
        <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
          <FormRow inputData="username" label="username" />
          <FormRow inputData="email" label="email" />
          <FormRow inputData="password" label="password" />
          <FormRow inputData="confirm_password" label="confirm_password" />

          <button type="submit" className="btn">
            <h5>Register</h5>
          </button>
        </form>
      </FormProvider>
    </Wrapper>
  );
};

export default Register;
