import actions from "./actions";

export const setInstitute = (institute = "") => {
	return {
		type: actions.SETINSTITUTE,
		institute: institute ? institute : null
	};
};
