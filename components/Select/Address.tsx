"use client";
import React, {useTransition, useState} from "react";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";
import type {UseControllerProps} from "react-hook-form";
import lodash from "lodash";
import {cn} from "@/utils";

type TSelectAddressProps = {
  className?: string
} & Partial<UseControllerProps>;

function SelectAddress({className, ...props}: TSelectAddressProps, ref: React.ForwardedRef<HTMLInputElement>) {

  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState([]);

  const search = lodash.debounce(
    (value: string) =>  
      startTransition(async () => {
        const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=" + encodeURIComponent(value));
        const resBody = await response.json();
        if (resBody?.features)
          setOptions(resBody.features);
      })
    , 1000);
  return (
    <Combobox as="div" {...props}>
      <ComboboxInput
        aria-label="Address"
        placeholder="Address"
        className={cn("input input-bordered w-full", className)}
        displayValue={(label: string) => label}
        onChange={(event) => {
          search(event.target.value);
        }}
      />
      <ComboboxOptions as="ul" anchor="bottom" className="menu bg-base-200 rounded-box ">
        {options.map(({properties: {label}}, key) => (
          <ComboboxOption as="li" key={key} value={label}>
            <a>{label}</a>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default React.forwardRef(SelectAddress);
