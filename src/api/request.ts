import axios from "axios";

const request = axios.create({
  baseURL: "/api",
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = `/login?ref=${window.location.href}`;
    }
    return Promise.reject(error);
  }
);

export default request;
