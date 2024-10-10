import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8000",
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // // Alter defaults after instance has been created
    // config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
    // với json-server ảo sẽ bị lỗi CORS nếu thêm header Authorization nên phải comment tắt đi
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log(">>> interceptor", response);
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // console.log(">>> check error: ", error);
    if (error?.response?.data) return error?.response?.data;
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);
export default instance;
