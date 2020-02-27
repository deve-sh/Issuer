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
		default:
			return state;
	}
};

export default rootReducer;
