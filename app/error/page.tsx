import React from "react";

type TPageErrorParams = {
    searchParams: {
        code: string
    }
}

const pageError = (params: TPageErrorParams) => {
  return (
    <div className='w-full'>
      <h1 className="justify-center text-xl">{params.searchParams.code}</h1>
    </div>
  );
};

export default pageError;
