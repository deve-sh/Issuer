import axios from "axios";

import config from "../config";
import instituteConfig from "./config";

import { getError } from "../helpers";

export const fetchInstitutes = (errorCallback = () => {}) => {
	if (errorCallback && typeof errorCallback === "function") {
		const endpoint =
			config.HTTPS +
			config.BACKEND +
			config.API +
			instituteConfig.INSTITUTES +
			instituteConfig.GETINSTITUTES;
		
		return axios
			.get(endpoint)
			.then(res => res)
			.catch(err => errorCallback(getError(err)));
	}
};
