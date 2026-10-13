import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "../input";
function FormInput({
  name,
  label,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-base font-thin">
        {label}
      </FieldLabel>
      <Input id={name} name={name} type={type} placeholder={placeholder} />
    </Field>
  );
}
export default FormInput;
