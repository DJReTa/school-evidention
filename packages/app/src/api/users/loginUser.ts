import { LoginFormData } from "@/types";
import { fetcherWithoutAuthToken } from "..";

const loginUser = async (data: LoginFormData) => {
  await fetcherWithoutAuthToken.post("/users/login", data);
};

export default loginUser;
