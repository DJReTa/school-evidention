import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  surname: yup.string().required("Surname is required!"),
  username: yup
    .string()
    .required("Username is required!")
    .min(5, "Username must be at least 5 characters!")
    .max(15, "Username can't be longer than 15 characters!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email format!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
      "Password must contain: uppercase letter(A-Z), lowercase letter(a-z), digit(0-9) and a special character!"
    ),
  confirmationPassword: yup
    .string()
    .required("Confirmation password is required!")
    .oneOf([yup.ref("password")], "Passwords must match!"),
});

export default registerSchema;
