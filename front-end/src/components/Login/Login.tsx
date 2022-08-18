import React from "react";
import { Wrapper } from "./Login.style";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "../../components/FormRow/FormRow";

const schema = yup.object().shape({
  email: yup.string().email().required("Email required"),
  password: yup.string().min(8).required("Password is required"),
});

interface FormInterface {
  email: string;
  password: string;
  confirm_password?: string;
  username?: string;
}

const Login = () => {
  const FormMethods = useForm<FormInterface>({ resolver: yupResolver(schema) });

  const { handleSubmit } = FormMethods;

  const formSubmitHandler: SubmitHandler<FormInterface> = (
    data: FormInterface
  ) => {
    console.log("Login", { data });
  };

  return (
    <Wrapper>
      <FormProvider {...FormMethods}>
        <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
          <FormRow inputData="email" label="email" />
          <FormRow inputData="password" label="password" />

          <button type="submit" className="btn">
            <h5>Login</h5>
          </button>
        </form>
      </FormProvider>
    </Wrapper>
  );
};

export default Login;
