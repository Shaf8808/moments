import axios from "axios";

axios.defaults.baseURL = "https://django-rest-api-de0173352397.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/fprm-data";
axios.defaults.withCredentials = true;

// Intercepts request by a user
export const axiosReq = axios.create();
// Intercepts response from an api
export const axiosRes = axios.create();
