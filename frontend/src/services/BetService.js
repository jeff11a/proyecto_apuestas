import http from "../http-common";

const getAll = (params) => {
  return http.get("/bets", { params });
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

const countFinished = () => {
  return http.get("/bets/countFinished");
};

const countActive = () => {
  return http.get("/bets/countActive");
};

const countAll = () => {
  return http.get("/bets/countAll");
};

const BetService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByPlayer,
  countFinished,
  countActive,
  countAll
};

export default BetService;
