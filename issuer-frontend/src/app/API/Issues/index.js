import axios from "axios";

import config from "../config";
import issueConfig from "./config";

import { getError, getAuthToken } from "../helpers";

export const getResIssues = errorCallback => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.GETRESISSUES;

	return axios
		.get(endpoint, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const getUnResIssues = errorCallback => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.GETUNRESISSUES;

	return axios
		.get(endpoint, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};
