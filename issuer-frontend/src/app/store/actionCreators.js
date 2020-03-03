import actions from "./actions";

export const setInstitute = (institute = "") => {
	return {
		type: actions.SETINSTITUTE,
		institute: institute ? institute : null
	};
};

export const setInstitutes = (institutes = []) => {
	return {
		type: actions.SETINSTITUTES,
		institutes: institutes ? institutes : null
	};
};

export const loginUser = payload => {
	return {
		type: actions.LOGIN,
		name: payload.name,
		email: payload.email,
		department: payload.department,
		isHead: payload.isHead,
		isAdmin: payload.isAdmin,
		canPostComplaints: payload.canPostComplaints,
		isApproved: payload.isApproved
	};
};

export const logout = () => {
	return {
		type: actions.LOGOUT
	};
}