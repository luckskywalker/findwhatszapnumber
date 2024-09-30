import {IEnterprise} from "@/typescript/enterprise";
import Image from "next/image";
import React from "react";

type TEnterpriseProps = {
    className?: string,
    enterprise: IEnterprise
}

const Enterprise: React.FC<TEnterpriseProps> = ({className, enterprise}) => {
  return (
    <div className={`flex flex-col sm:w-96 w-full bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 ${className}`}>
      <Image width={270} height={150} className="rounded-t-xl sm:w-96 w-full" src={`data:image/${enterprise?.image?.contentType};base64,${enterprise?.image?.data?.toString("base64")}`} alt="Card Image" />
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {enterprise.label}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400 break-words">
          {enterprise.description}
        </p>
        <a className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
          {enterprise.phoneNumber}
        </a>
      </div>
    </div>
  );
};

export default Enterprise;
