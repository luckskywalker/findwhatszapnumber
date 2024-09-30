"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import Field from "@/components/Field";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {InferType} from "yup";
import {signIn} from "next-auth/react";


const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  passwordCheck: yup.string().required().oneOf([yup.ref("password")], "Passwords must match"),
});

type TUserSignup = InferType<typeof userSchema>

type TSignUpProps = {
  onSubmit: SubmitHandler<TUserSignup>
}

type TSignUpConnectedProps = {
  onError?: (e: unknown) => void, 
  onSuccess?: (data: TUserSignup) => void
}


const FormSignUp: React.FC<TSignUpProps> = ({onSubmit}) => {
  const {register, handleSubmit, formState: {errors}, watch} = useForm<TUserSignup>({resolver: yupResolver(userSchema)});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <Field error={errors.email}>
        <input className="input input-bordered w-full"
          type="email"
          placeholder="email"
          {...register("email")}
        />
      </Field>
      
      
      <Field error={errors.password}>
        <input className="input input-bordered w-full"
          type="password"
          placeholder="password"
          {...register("password")}
        />
      </Field>
      
      <Field error={errors.passwordCheck}>
        <input className="input input-bordered w-full"
          type="password"
          placeholder="cornfirm password"
          {...register("passwordCheck")}
        />
      </Field>
      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Sign Up
      </button>
      
    </form >
  );
};


const FormSignUpConnected: React.FC<TSignUpConnectedProps> = ({onError= (data) => console.log(data), onSuccess = (data) => console.log(data)}) => {

  const handleSubmit = async (data: TUserSignup) => {
    let resjson: TUserSignup | null = null;

    const tosenddata = new FormData();

    for (const key in data) {
      tosenddata.append(key, data[key as keyof TUserSignup] as string);
    }
    await signIn("Credentials", data);
    // try {
    //   const res = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     body: JSON.stringify(data)
    //   });
    //   resjson = await res.json();
    // } catch (e) {
    //   onError && onError(e);
    // } finally {
    //   onSuccess && onSuccess(resjson as TUserSignup);
    // }
  };


  return <FormSignUp onSubmit={handleSubmit} />;
};




export default FormSignUpConnected;