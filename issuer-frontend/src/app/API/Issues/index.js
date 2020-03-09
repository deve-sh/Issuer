import axios from "axios";

import config from "../config";
import issueConfig from "./config";

import { getError, getAuthToken } from "../helpers";

export const getIssues = (isResolved = false, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.GETISSUES;

	return axios
		.post(endpoint, { isResolved }, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};