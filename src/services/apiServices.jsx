import axios from "../utils/axiosCustomize"; //axios này là hàm instance, cách đặt tên ko quan trọng

const postCreateOrder = (order) => {
  return axios.post("/orders-draft/", order);
  // return axios.post("/orders-draft", { order: order }); // ! cách này thêm key là order trước object
};

const getAllOrders = () => {
  return axios.get("/orders-draft/");
};

const putUpdateOrder = (order) => {
  return axios.put(`/orders-draft/${order.id}`, order);
};

const deleteOrder = (orderId) => {
  return axios.delete(`/orders-draft/${orderId}`, { data: { id: orderId } });
};

export {
  //AGV
  getAllOrders,
  deleteOrder,

  //new AGV
  postCreateOrder,
  putUpdateOrder,
};
