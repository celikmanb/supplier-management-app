import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  }
});

/* apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    return config
  },
  (error) => {
    toast.error('Error: ' + error);
    return Promise.reject(error);
  }
); */

httpClient.interceptors.response.use(response => {
	return response;
}, (error) => {
	if (error.response?.status === 401 || error.response?.status === 403) {
		console.log('Unauthorized! Redirecting to login...')
    // toast.error('Unauthorized! Redirecting to login...');
		// window.location.href = "/login";
		// localStorage.removeItem('token')
	}
  console.log("util", error)
	// toast.error('Error: ' + error);
	return error;
});

export default httpClient;