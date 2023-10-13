import { ImageFormInput } from ".";

type UpdateUserFormData = {
  name: string;
  surname: string;
  oldPassword?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  image?: ImageFormInput | null;
  [key: string]: any;
};

export default UpdateUserFormData;
