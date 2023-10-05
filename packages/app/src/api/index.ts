import cookies from "@/utils/cookieUtils";
import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 20000,
});

fetcher.interceptors.request.use(
  (request) => {
    const token = cookies.get("token");
    request.headers.Authorization = `JWT ${token}`;
    return request;
  },
  (error) => {
    if (error?.response?.status === 401) {
      cookies.remove("token");
      window.location.reload();
    }
    throw error;
  }
);

export const fetcherWithoutAuthToken = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 20000,
});

export default fetcher;
export { default as loginUser } from "./users/loginUser";
export { default as registerUser } from "./users/registerUser";
