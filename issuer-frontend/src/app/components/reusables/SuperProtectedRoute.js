import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../helpers";

const SuperProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin, isHead } = useSelector(state => state);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && getToken() && (isAdmin || isHead) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default SuperProtectedRoute;
