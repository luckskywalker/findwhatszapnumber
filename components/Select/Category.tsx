"use client";
import React from "react";
import {Select} from "@headlessui/react";
import type {UseFormRegisterReturn} from "react-hook-form";
import {cn} from "@/utils";

type TSelectCategoryProps = {
  className?: string
} & Partial<UseFormRegisterReturn>

const SelectCategory: React.FC<TSelectCategoryProps> = ({className}) => {
  return (
    <Select name="category" aria-label="status" className={cn("select select-bordered", className)}>
      <option value="active">Active</option>
      <option value="paused">Paused</option>
      <option value="delayed">Delayed</option>
      <option value="canceled">Canceled</option>
    </Select>
  );
};

export default SelectCategory;
