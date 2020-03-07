import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../helpers";

const SuperProtectedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, isHead } = useSelector(state => state);
	const institute = useSelector(state => state.institute);

	return (
		<Route
			{...rest}
			render={props =>
				institute ? (
					isAuthenticated && getToken() && (isHead) ? (
						<Component {...props} />
					) : (
						<Redirect to="/home" />
					)
				) : (
					<Redirect to={"/"} />
				)
			}
		/>
	);
};

export default SuperProtectedRoute;
