import { useFormStatus } from "react-dom";
import { Button } from "../button";

const SubmitButton = ({ btnStyle }: { btnStyle: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={btnStyle} disabled={pending}>
      {pending ? "submitting..." : "submit"}
    </Button>
  );
};
export default SubmitButton;
