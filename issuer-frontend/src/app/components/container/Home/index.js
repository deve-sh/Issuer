import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeUI from "../../presentational/Home";

import { fetchUser } from "../../../API/Users";
import { dispatchFetchedUser, logout } from "../../../store/actionCreators";
import toasts from "../../../constants/toastConstants";
import { getToken, removeToken, getInstitute } from "../../../helpers";

const Home = props => {
	const state = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		// Check if token exists, if yes, then fetch user details.

		if (getToken() && !state.isAuthenticated) {
			// Send token to backend to verify. If verified, log the user in.
			fetchUser(err => toasts.generateError(err)).then(res => {
				if (res && res.data) {
					if (
						res.data.institute !== JSON.parse(getInstitute())._id ||
						!res.data._id ||
						!res.data.email ||
						!res.data.department ||
						!res.data.name
					)
						props.logoutFunc();
					// Tampered and Unauthorized.
					else{
						dispatch(dispatchFetchedUser(res.data));
						toasts.generateSuccess("Fetched User Details.");
					}
				}
			});
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
