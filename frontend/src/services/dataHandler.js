import axios from "axios";
//const baseUrl = "http://localhost:3001/notes";

//We no longer return the promise returned by axios directly. Instead, we assign the promise to the request variable and call its then method:
//The modified getAll function still returns a promise, as the then method of a promise also returns a promise.
const getAll = (baseUrl) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const getUser = (baseUrl, token) => {
  const request = axios.get(baseUrl, {
    headers: {
      "auth-token": token,
    },
  });
  return request.then((response) => response.data);
};

const updateUser = (baseUrl, newObject, token) => {
  const request = axios.put(baseUrl, newObject, {
    headers: {
      "auth-token": token,
    },
  });
  return request.then((response) => response.data);
};

const create = (baseUrl, newObject) => {
  const request = axios.post(baseUrl, newObject);

  return request.then((response) => response.data);
};

const update = (baseUrl, id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
//The functions directly return the promises returned by the axios methods.
const services = {
  getAll,
  create,
  update,
  getUser,
  updateUser,
};

export default services;
