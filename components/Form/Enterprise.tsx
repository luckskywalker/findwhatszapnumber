"use client";

import React from "react";
import {useForm, SubmitHandler, DeepPartial, useController} from "react-hook-form";
import SelectAddress from "@/components/Select/Address";
import Field from "@/components/Field";

import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {InferType} from "yup";

const enterpriseSchema = yup.object({
  label: yup.string().required(),
  description: yup.string().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
  image: yup.mixed(),
  category: yup.string().required()
});

type TEnterprise = InferType<typeof enterpriseSchema> 

type TFormEnterpriseProps = {
    defaultValues?: DeepPartial<TEnterprise>,
    onSubmit: SubmitHandler<TEnterprise>
}

type TFormEnterpriseConnectedProps = {
    defaultValues?: DeepPartial<TEnterprise>,
    onError?: (e: unknown) => void,
    onSuccess?: (data: unknown) => void

}

const FormEnterprise: React.FC<TFormEnterpriseProps> = ({defaultValues, onSubmit, ...props}) => {
  const {register, handleSubmit, control, formState: {errors}} = useForm<TEnterprise>({resolver: yupResolver(enterpriseSchema), defaultValues});
  const {field} = useController({control, name: "address"});

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Field error={errors.label}>
        <input className="input input-bordered w-full"
          type="text"
          placeholder="label"
          aria-label="label"
          {...register("label")}
        />
      </Field>
      <Field error={errors.description}>
        <textarea className="textarea textarea-bordered w-full" rows={3} placeholder="description" aria-label="description" {...register("description")} />
      </Field>
      <Field error={errors.category}>
        <select className="select select-bordered w-full" aria-label="category" {...register("category")} >
          <option value="Coiffeur">Coiffeur</option>
          <option value="Maçon">Maçon</option>
          <option value="Restaurant">Restaurant</option>
        </select>
      </Field>
      <Field error={errors.phoneNumber}>
        <input className="input input-bordered w-full" type="text" placeholder="phone number" aria-label="phoneNumber" {...register("phoneNumber")} />
      </Field>
      <Field error={errors.address}>
        <SelectAddress aria-label="address" {...field} />
      </Field>
      <Field error={errors.image}>
        <input type="file" className="file-input input-bordered w-full" placeholder="image" aria-label="image" {...register("image")} />
      </Field>
      <button
        type="submit"
        className="btn btn-primary w-full"
        aria-label="submit"
      >
        Update Enterprise
      </button>
      
    </form >
  );
};

const FormEnterpriseConnected: React.FC<TFormEnterpriseConnectedProps> = ({defaultValues, onError, onSuccess}) => {

  const handleSubmit = async (data: TEnterprise) => {
    let resjson: TEnterprise | null = null;

    const tosenddata = new FormData();

    for (const key in data) {
      tosenddata.append(key, data[key as keyof TEnterprise] as string);
    }

    if (data.image && data.image[0]) {
      tosenddata.set("image", data.image[0]);
    }

    try {
      const res = await fetch("/api/user/enterprise/update", {
        method: "POST",
        body: tosenddata
      });
      resjson = await res.json();
    } catch (e) {
      onError && onError(e);
    } finally {
      onSuccess && onSuccess(resjson);
    }
  };


  return <FormEnterprise onSubmit={handleSubmit} defaultValues={defaultValues}/>;
};


export default FormEnterpriseConnected;