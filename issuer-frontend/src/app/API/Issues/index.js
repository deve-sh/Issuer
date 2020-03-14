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

export const getCategories = (department, institute, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.GETCATEGORIES;

	return axios
		.post(endpoint, { department, institute })
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const addCategory = (
	categoryName,
	department,
	institute,
	errorCallback
) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.ADDCATEGORY;

	return axios
		.post(endpoint, { categoryName, department, institute }, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const createIssue = (payLoad, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.CREATEISSUE;

	return axios
		.post(endpoint, payLoad, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const issueUpdater = (payLoad, issueId, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.UPDATEISSUE +
		issueId +
		"/";

	return axios
		.patch(endpoint, payLoad, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const issueDeleter = (issueId, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.DELETEISSUE +
		issueId +
		"/";

	return axios
		.delete(endpoint, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const issueResolver = (resolution, issueId, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.RESOLVEISSUE +
		issueId +
		"/";

	return axios
		.post(endpoint, { resolution }, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};

export const resolutionFetcher = (issueId, errorCallback) => {
	const endpoint =
		config.HTTPS +
		config.BACKEND +
		config.API +
		issueConfig.ISSUEROUTE +
		issueConfig.GETRESOLUTION +
		issueId +
		"/";

	return axios
		.get(endpoint, getAuthToken())
		.then(res => res)
		.catch(err => errorCallback(getError(err)));
};
