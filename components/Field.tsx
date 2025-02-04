import React from "react";
import {type FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

type TFieldProps = {
    label?: string
    error?: Merge<FieldError, (FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined)[]>
    children: React.ReactNode
} 

const Field: React.FC<TFieldProps> = ({label, children, error}) => {
  return (
    <div className="mb-4">
      <label>{label}</label>
      {children}
      {error ? <p className="text-red-500 text-xs italic mt-2">{error.message || "Input Error"}</p> : null}
    </div>
  );
};

export default Field;
