import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../helpers";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const institute = useSelector(state => state.institute);

  return (
    <Route
      {...rest}
      render={props =>
        institute ? (
          isAuthenticated && getToken() ? (
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

export default ProtectedRoute;
