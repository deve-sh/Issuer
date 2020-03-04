import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "react-notify-toast";

// Constants
import constants from "./app/constants";
import toasts from "./app/constants/toastConstants";

// APIs
import { getToken, removeToken } from "./app/helpers";

// Global Actions
import { logout } from "./app/store/actionCreators";

// Components

import AuthenticationRoute from "./app/components/reusables/AuthenticationRoute";
import ProtectedRoute from "./app/components/reusables/ProtectedRoute";
import HomeRoute from "./app/components/reusables/HomeRoute";
import SuperProtectedRoute from "./app/components/reusables/SuperProtectedRoute";

import SelectInstitute from "./app/components/container/SelectInstitute";
import Home from "./app/components/container/Home";
import Header from "./app/components/reusables/Header";
import Login from "./app/components/container/Authentication/login";
import Register from "./app/components/container/Authentication/register";

const App = props => {
	const dispatch = useDispatch();
	const state = useSelector(state => state);

	// // Authentication handlers
	// const [showAuth, setshowAuth] = useState(false);
	// const [authMode, setauthMode] = useState(constants.LOGINMODE);

	// const toggleAuth = newAuthMode => {
	// 	if (newAuthMode) setauthMode(newAuthMode);
	// 	setshowAuth(!showAuth);
	// };

	// const switchMode = newAuthMode => setauthMode(newAuthMode);

	// const isAuthenticated = useSelector(state => state.isAuthenticated);
	// const hasFetchedUser = useSelector(state => state.hasFetchedUser);

	// Actual app.

	const logoutFunc = () => {
		if (getToken() && state.isAuthenticated) {
			removeToken();
			dispatch(logout());
		}
	};

	return (
		<React.Fragment>
			{/* Global Toast for error messages */}
			<Notifications />
			<Header
				isAuthenticated={state.isAuthenticated}
				isHead={state.isHead}
				isAdmin={state.isAdmin}
				logoutFunc={logoutFunc}
			/>
			<Switch>
				<Route exact path={"/"} component={SelectInstitute} />
				<HomeRoute path={"/home"} component={(props) => <Home {...props} logoutFunc={logoutFunc} />} />
				<AuthenticationRoute path={"/login"} component={Login} />
				<AuthenticationRoute path={"/register"} component={Register} />
			</Switch>
		</React.Fragment>
	);
};
export default App;
