import type FormInput from "@/types/FormInput";
import { Controller } from "react-hook-form";
import { Input } from "semantic-ui-react";

const FormInput = ({
  name,
  labelName,
  control,
  type = "string",
}: FormInput) => {
  return (
    <>
      <label>{labelName}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Input {...field} type={type} error={!!fieldState.error} />
            {fieldState.error && (
              <p style={{ color: "red" }}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </>
  );
};

export default FormInput;
