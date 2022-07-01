import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL+"admin/login";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL, {
        email,
        password
      })
      .then(response => {
		  console.log(response);
		if (response.data.result_obj.access_token) {
			console.log(response.data.result_obj);	
          localStorage.setItem("user", JSON.stringify(response.data.result_obj));
        }
        return response.data;
      });
  }
  logout() {
	localStorage.removeItem("user");
	
  }
 getCurrentUser() {
	return JSON.parse(localStorage.getItem('user'));
  }
}
export default new AuthService();