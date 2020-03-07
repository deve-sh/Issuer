import initialState from "./initialState";
import actions from "./actions";

const rootReducer = (state = initialState, action = { type: null }) => {
	switch (action.type) {
		case actions.SETINSTITUTE:
			return {
				...state,
				institute: action.institute ? action.institute : state.institute
			};
		case actions.SETINSTITUTES:
			return {
				...state,
				institutes: action.institutes
					? action.institutes
					: state.institutes,
				hasFetchedInstitutes: action.institutes
					? true
					: state.hasFetchedInstitutes
			};
		case actions.LOGIN:
			return {
				...state,
				isAuthenticated: true,
				email: action.email,
				name: action.name,
				department: action.department,
				isHead: action.isHead,
				isAdmin: action.isAdmin,
				canPostComplaints: action.canPostComplaints,
				isApproved: action.isApproved
			};
		case actions.LOGOUT:
			return {
				...state,
				isApproved: false,
				isAuthenticated: false,
				email: "",
				name: "",
				department: null,
				isAdmin: false,
				isHead: false,
				canPostComplaints: false
			};
		case actions.SETFETCHEDUSER:
			return {
				...state,
				email: action.details.email,
				name: action.details.name,
				department: action.details.department,
				isHead: action.details.isHead,
				isAdmin: action.details.isAdmin,
				canPostComplaints: action.details.canPostComplaints,
				isApproved: action.details.isApproved,
				isAuthenticated: true
			};
		default:
			return state;
	}
};

export default rootReducer;
