import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeUI from "../../presentational/Home";

import { getToken, removeToken } from "../../../helpers";

const Home = props => {
	const state = useSelector(state => state);
	const dispatch = useDispatch();
	console.log(state);
	useEffect(() => {
		// Check if token exists, if yes, then fetch user details.

		if(getToken()){
			// Send token to backend to verify. If verified, log the user in.
		}
	}, []);

	return (
		<HomeUI
			isAuthenticated={state.isAuthenticated}
			isAdmin={state.isAdmin}
			isHead={state.isHead}
		/>
	);
};

export default Home;
