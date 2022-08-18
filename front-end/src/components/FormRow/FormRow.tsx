import React from "react";
import { useFormContext } from "react-hook-form";
import { Wrapper } from "./FormRow.style";

type inputType = {
  inputData: string;
  label: string;
};

const FormRow = ({ inputData, label }: inputType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const message: string = (errors[inputData]?.message as string) ?? "";

  return (
    <Wrapper>
      <div className="form-label">{label}</div>
      <input className="form-input" {...register(inputData)} />
      {errors[inputData] && errors[inputData]?.message && (
        <span className="alert alert-danger">{message}</span>
      )}
    </Wrapper>
  );
};

export default FormRow;
