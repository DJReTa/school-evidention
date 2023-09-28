import { RegisterFormData } from "@/types";
import { fetcherWithoutAuthToken } from "..";

const registerUser = async (data: RegisterFormData) => {
  await fetcherWithoutAuthToken.post("/users/register", data);
};

export default registerUser;
