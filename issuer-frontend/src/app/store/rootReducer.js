import initialState from "./initialState";
import actions from "./actions";

import { setInstitute } from "./actionCreators";

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
		default:
			return state;
	}
};

export default rootReducer;
