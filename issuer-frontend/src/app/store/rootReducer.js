import initialState from "./initialState";

const rootReducer = (state = initialState, action = { type: null }) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default rootReducer;
