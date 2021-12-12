import http from "../http-common";

const getAll = (params) => {
  return http.get("/users", { params });
};

const get = (id) => {
  return http.get(`/users/${id}`);
};

const create = (data) => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByName = (name) => {
  return http.get(`/users?name=${name}`);
};

const countUser = () => {
  return http.get("/users/count");
};

const countUserCLient = () => {
  return http.get(`/users/countClient`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  countUser,
  countUserCLient
};

export default UserService;
