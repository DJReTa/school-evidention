import { ImageFormInput } from "@/types";
import * as yup from "yup";

const updateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  surname: yup.string().required("Surname is required!"),
  oldPassword: yup
    .string()
    .nullable()
    .transform((_, value) => (value === "" ? null : value)),
  password: yup.string().when("oldPassword", ([value]) => {
    if (value)
      return yup
        .string()
        .required("Password is required!")
        .min(8, "Password must be at least 8 characters!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
          "Password must contain: uppercase letter(A-Z), lowercase letter(a-z), digit(0-9) and a special character!"
        );
    else
      return yup
        .string()
        .notRequired()
        .transform((_, value) => (value === "" ? null : value));
  }),
  confirmPassword: yup.string().when("password", ([value]) => {
    if (value)
      return yup
        .string()
        .required("Confirmation password is required!")
        .oneOf([yup.ref("password")], "Passwords must match!");
    else
      return yup
        .string()
        .notRequired()
        .transform((_, value) => (value === "" ? null : value));
  }),
  image: yup.mixed<ImageFormInput>().nullable(),
});

export default updateUserSchema;
