import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const HomeRoute = ({ component: Component, ...rest }) => {
  const institute = useSelector(state => state.institute);

  return (
    <Route
      {...rest}
      render={props =>
        institute ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default HomeRoute;
