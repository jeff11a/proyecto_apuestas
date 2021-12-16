import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(data) {
    return axios
      .post(API_URL + "signin",
        data
      )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return axios.post(API_URL + "signup", data);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }
}

export default new AuthService();