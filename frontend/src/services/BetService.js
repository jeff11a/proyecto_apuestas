import http from "../http-common";

const getAll = () => {
  return http.get("/bets");
};

const get = (id) => {
  return http.get(`/bets/${id}`);
};

const create = (data) => {
  return http.post("/bets", data);
};

const update = (id, data) => {
  return http.put(`/bets/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/bets/${id}`);
};

const removeAll = () => {
  return http.delete(`/bets`);
};

const findByPlayer = (player) => {
  return http.get(`/bets?player=${player}`);
};

const BetService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByPlayer,
};

export default BetService;
