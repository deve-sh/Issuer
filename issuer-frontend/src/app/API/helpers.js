import constants from "../constants";
import config from "./config";

export const getAuthToken = () => {
	return {
		headers: {
			authorization: localStorage.getItem(constants.AUTHTOKEN) || ""
		}
	};
};

export const getToken = () => localStorage.getItem(constants.AUTHTOKEN);

export const setAuthToken = (token = "") => {
	if(token){
		return {
			headers : {
				authorization : token
			}
		}
	}
	else return {};
}

export const getError = errorOb => {
	return errorOb.response
		? errorOb.response.data.error
		: config.CONNECTIONERROR;
};
