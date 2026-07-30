"use client";
import  { Control, Controller } from "react-hook-form";
import type { FieldError as fieldError } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { format } from "date-fns";
import { BookingType } from "@/utils/types";

type DatePickerProps = {
  name: "checkIn" | "checkOut";
  label: string;
  placeholder: string;
  control: Control<BookingType>;
  disabled?: (date: Date) => boolean;
  errors?: fieldError;
};

export default function DatePicker({
  name,
  control,
  errors,
  label,
  placeholder,
  disabled,
}: DatePickerProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" className="w-full">
                  {field.value
                    ? format(field.value, "dd / MM / yyyy")
                    : placeholder}
                </Button>
              }
            />

            <PopoverContent align="center" sideOffset={10} className="w-auto">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <FieldError errors={[errors]} />
    </Field>
  );
}
