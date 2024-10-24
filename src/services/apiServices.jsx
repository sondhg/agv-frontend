import axios from "../utils/axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng

const postCreateOrder = (order) => {
  return axios.post("/orders/", order);
  // return axios.post("/orders", { order: order }); // ! cách này thêm key là order trước object
};

const getAllOrders = () => {
  return axios.get("/orders/");
};

const putUpdateOrder = (order) => {
  return axios.put(`/orders/${order.order_id}/`, order);
};

const deleteOrder = (orderId) => {
  return axios.delete(`/orders/${orderId}/`, { data: { order_id: orderId } });
};

const postLogin = (email, password) => {
  return axios.post("/login", {
    email,
    password,
  });
};

const postRegister = (email, password, name) => {
  return axios.post("/register", {
    email,
    password,
    name,
  });
};

const postLogout = (email, refresh_token) => {
  return axios.post("/logout", { email, refresh_token });
};

const getAllSchedules = () => {
  return axios.get("/schedules/");
};

const getAllAGVs = () => {
  return axios.get("/schedules/");
};

export {
  // orders
  getAllOrders,
  deleteOrder,
  postCreateOrder,
  putUpdateOrder,

  // users
  postLogin,
  postRegister,
  postLogout,

  // schedules
  getAllSchedules,

  // AGVs
  getAllAGVs,
};
