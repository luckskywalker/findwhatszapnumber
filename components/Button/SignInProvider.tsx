"use client";
import React from "react";
import {signIn} from "next-auth/react";

type ButtonProps = {
    type?: string,
    className?: string
  }

const classDef = "btn btn-outline";

const SignUp: React.FC<ButtonProps> = ({type="github", className}) => {
  return (
    <button
      className={`${classDef} ${className}`}
      onClick={() => signIn(type)}
    >
      sign up with {type}
    </button>

  );
};

export default SignUp;
