import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../helpers";

const AuthenticationRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector(state => state.isAuthenticated);

	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated || !getToken() ? (
					<Component {...props} />
				) : (
					<Redirect to="/settings" />
				)
			}
		/>
	);
};

export default AuthenticationRoute;
