import axios from "../utils/HA_axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng

const HA_postLogin = (userEmail, userPassword) => {
  return axios.post(
    "/login",
    {
      email: userEmail,
      password: userPassword,
    },
    { headers: { "content-type": "application/json" } },
  );
};

const HA_postRegister = (email, password, name) => {
  return axios.post(
    "/register",
    {
      email,
      password,
      name,
    },
    { headers: { "content-type": "application/json" } },
  );
};

const HA_logout = (email, refresh_token) => {
  return axios.post(
    "/logout",
    { email, refresh_token },
    { headers: { "content-type": "application/json" } },
  );
};

export { HA_postLogin, HA_postRegister, HA_logout };
