import React from "react";
import { Link } from "react-router-dom";

import constants from "../../constants";

import Icon from "./Icon";

const Header = props => {
	return (
		<header id={"appheader"}>
			<div className={"fixedcontainer row aligncenter"}>
				<div className={"col-6 alignleft"}>
					<Link className={"logo"} to={"/"}>
						{constants.APPNAME}
					</Link>
				</div>
				<div className={"col-6 alignright"}>
					<div className={"optionstile"}>
						{props.isAuthenticated ? (
							<React.Fragment>
								<Link
									className={"option"}
									to={"/issues"}
									title={"Issues"}
								>
									<Icon className={"fas fa-list-ul"} />
								</Link>
								{props.isAdmin || props.isHead ? (
									<Link
										className={"option"}
										to={"/users"}
										title={"Pending Approvals"}
									>
										<Icon className={"fas fa-users"} />
									</Link>
								) : (
									""
								)}
								<Link
									className={"option"}
									to={"/settings"}
									title={"Settings"}
								>
									<Icon className={"fas fa-cog"} />
								</Link>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Link
									className={"option"}
									to={"/login"}
									title={"Login"}
								>
									<Icon className={"fas fa-door-open"} />
								</Link>
								<Link
									className={"option"}
									to={"/register"}
									title={"Register"}
								>
									<Icon className={"fas fa-user-plus"} />
								</Link>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
