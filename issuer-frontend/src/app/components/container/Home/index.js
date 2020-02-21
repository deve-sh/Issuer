import React from "react";

import HomeUI from "../../presentational/Home";

const Home = props => {
	return <HomeUI isAuthenticated={props.isAuthenticated} />;
};

export default Home;
