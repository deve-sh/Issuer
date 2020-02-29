import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../helpers";

const AuthenticationRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector(state => state.isAuthenticated);
	const institute = useSelector(state => state.institute);

	return (
		<Route
			{...rest}
			render={props =>
				(!isAuthenticated || !getToken()) && institute ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default AuthenticationRoute;
