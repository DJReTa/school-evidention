import type FormInput from "@/types/FormInput";
import { Controller } from "react-hook-form";
import { Input } from "semantic-ui-react";

const FormInput = ({
  name,
  labelName,
  type = "string",
  disabled = false,
}: FormInput) => {
  return (
    <>
      <label>{labelName}</label>
      <Controller
        name={name}
        render={({ field, fieldState }) => (
          <div>
            <Input
              {...field}
              type={type}
              error={!!fieldState.error}
              disabled={disabled}
            />
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
