import { Controller } from "react-hook-form";
import ImageInput from "./ImageInput";

const FormImageFileInput = ({ name }: { name: string }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <ImageInput field={field} />}
    />
  );
};

export default FormImageFileInput;
