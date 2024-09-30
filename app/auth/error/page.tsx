import React from "react";
import {Form, Button} from "@/components";

const page = ({params, searchParams}: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined }}) => {

  console.log("{params, searchParams}", {params, searchParams});

  return (
    <div>
      <h1> ERRRRRRRRORRRRRR </h1>
    </div>
  );
};

export default page;
