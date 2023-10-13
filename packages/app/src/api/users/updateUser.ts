import { ImageFormInput, UpdateUserFormData } from "@/types";
import fetcher from "..";

const updateUser = async ({
  username,
  confirmPassword,
  ...data
}: UpdateUserFormData & { username: string }) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "image" && data[key]?.file)
      formData.append(key, (data[key] as ImageFormInput).file);
    else data[key] && formData.append(key, data[key]);
  }

  await fetcher.patch(`/users/update/${username}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default updateUser;
