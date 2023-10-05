import { LoginFormData } from "@/types";
import cookies from "@/utils/cookieUtils";
import { fetcherWithoutAuthToken } from "..";

const expirationDate = new Date();

const loginUser = async (data: LoginFormData) => {
  const { data: responseData } = await fetcherWithoutAuthToken.post(
    "/users/login",
    data
  );
  cookies.set("token", responseData.token, {
    maxAge: expirationDate.setDate(expirationDate.getDate() + 7),
  });
};

export default loginUser;
