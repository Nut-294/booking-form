import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "../input";
function FormInput({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-base font-thin">
        {label}
      </FieldLabel>
      <Input id={name} name={name} type={type} />
    </Field>
  );
}
export default FormInput;
