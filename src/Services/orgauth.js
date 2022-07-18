import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL+"organization/login", {
        email,
        password
      })
      .then(response => {
		  console.log(response);
		if (response.data.result_obj.access_token) {
			console.log(response.data.result_obj);	
          localStorage.setItem("orguser", JSON.stringify(response.data.result_obj));
        }
        return response.data;
      });
  }
  logout() {
	localStorage.removeItem("orguser");
	
  }
 getCurrentUser() {
	return JSON.parse(localStorage.getItem('orguser'));
  }
}
export default new AuthService();