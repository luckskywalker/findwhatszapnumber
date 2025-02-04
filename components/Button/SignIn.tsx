import React from "react";

type ButtonProps = {
    title?: string,
    className?: string,
    onClick: () => void
}

const classDef = "btn btn-outline";

function SignUp({title = "Sign Up", className, onClick}: ButtonProps) {
  return (
    <button
      className={`${classDef} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>

  );
}

export default SignUp;
