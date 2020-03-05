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

export const getUnapprovedUsers = (institute, department, errorCallback) => {
	if (institute && department && errorCallback) {
		const endpoint =
			config.HTTPS +
			config.BACKEND +
			config.API +
			userConfig.USERROUTE +
			userConfig.UNAPPROVEDUSERS +
			`/${institute}/${department}/`;

		return axios
			.get(endpoint, getAuthToken())
			.then(res => res)
			.catch(err => errorCallback(getError(err)));
	}
};

export const approveUser = (userid, payLoad, errorCallback) => {
	if (errorCallback && userid && payLoad) {
		const endpoint =
			config.HTTPS +
			config.BACKEND +
			config.API +
			userConfig.USERROUTE +
			userConfig.APPROVEUSER +
			`/${userid}/`;

		return axios
			.patch(endpoint, payLoad, getAuthToken())
			.then(res => res)
			.catch(err => errorCallback(getError(err)));
	}
};

export const sendResetRequest = (email, errorCallback = () => {}) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		userConfig.USERROUTE +
		userConfig.RESETPASS;

	let body = { email };

	return axios
		.patch(endpoint, body, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};
