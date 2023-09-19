import type { Control } from "react-hook-form";

type FormInput = {
  name: string;
  labelName: string;
  control: Control<any, any>;
  type?: string;
};

export default FormInput;
