import axios from "axios";

import config from "../config";
import userConfig from "./config";

import { getError, getAuthToken } from "../helpers";

export const register = (payLoad, errorCallback) => {
	if (
		payLoad &&
		typeof payLoad === "object" &&
		errorCallback &&
		typeof errorCallback === "function"
	) {
		const endpoint =
			config.HTTPS +
			config.BACKEND +
			config.API +
			userConfig.USERROUTE +
			userConfig.REGISTER;

		return axios
			.post(endpoint, payLoad)
			.then(res => res)
			.catch(err => errorCallback(getError(err)));
	}
};

export const login = (payLoad, errorCallback) => {
	if (
		payLoad &&
		typeof payLoad === "object" &&
		errorCallback &&
		typeof errorCallback === "function"
	) {
		const endpoint =
			config.HTTPS +
			config.BACKEND +
			config.API +
			userConfig.USERROUTE +
			userConfig.LOGIN;

		return axios
			.post(endpoint, payLoad)
			.then(res => res)
			.catch(err => errorCallback(getError(err)));
	}
};

export const fetchUser = (errorCallback = () => {}) => {
	if (errorCallback && typeof errorCallback === "function") {
		const endpoint =
			config.HTTPS +
			config.BACKEND +
			config.API +
			userConfig.USERROUTE +
			userConfig.ME;

		return axios
			.get(endpoint, getAuthToken())
			.then(res => res)
			.catch(err => errorCallback(getError(err)));
	}
};
