import React from "react";
import {redirect} from "next/navigation";
import {Form, Button} from "@/components";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

const page = async ({params, searchParams}: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined }}) => {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if(searchParams?.error) return redirect(encodeURI(`/auth/error?error=${searchParams.error}&redirect=${searchParams.callbackUrl}`));
  
  if(searchParams?.callbackUrl && session) return redirect(encodeURI(searchParams.callbackUrl as string));


  return (
    <div>
      <h1> Sign Up </h1>
      <Form.SignUp />
      <Button.SignInProvider type="github"/>
    </div>
  );
};

export default page;
