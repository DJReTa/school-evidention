import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 20000,
});

export const fetcherWithoutAuthToken = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 20000,
});

export default fetcher;
export { default as registerUser } from "./users/registerUser";
export { default as loginUser } from "./users/loginUser";
