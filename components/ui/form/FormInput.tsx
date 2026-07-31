"use client";
import { Input } from "../input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type {
  FieldError as fieldError,
  FieldPath,
  UseFormRegister,
} from "react-hook-form";
import { BookingType } from "@/utils/types";

type FormInputProp = {
  label: string;
  name: FieldPath<BookingType>;
  placeholder: string;
  errors?: fieldError;
  register: UseFormRegister<BookingType>;
};

export default function FormInput({
  label,
  name,
  placeholder,
  errors,
  register,
}: FormInputProp) {
  return (
    <Field>
      <FieldLabel htmlFor="guests">{label}</FieldLabel>
      <Input
        id={name}
        type="number"
        min={1}
        placeholder={placeholder}
        {...register(name, {
          valueAsNumber: true,
        })}
      />
      <FieldError errors={[errors]} />
    </Field>
  );
}
