import React, { useState } from "react";

import Button from "../../reusables/Button";
import Icon from "../../reusables/Icon";

const UsersUI = props => {
	return (
		<div className={"users-container"}>
			<div className={"fixedcontainer users"}>
				<div className={"heading extraweight"}>Unapproved Users</div>
				<br />
				{props.users
					? props.users.map((user, index) => (
							<div className={"user row"}>
								<div className={"col-6 userdetails"}>
									<div className={"username"}>
										{user.name}
									</div>
									<div className={"useremail"}>
										{user.email}
									</div>
									<div className={"userdepartment"}>
										{user.department}
									</div>
									<div className={"userjoinedat"}>
										{new Date(user.joinedAt).toDateString()}
									</div>
								</div>
								<div className={"col-5 useroptions"}></div>
								<div className={"col-1 userapprove"}>
									<Button
										className={"accessibility"}
										title={"Approve"}
										onClick={() =>
											props.userApprover(user._id, index)
										}
									>
										<Icon
											className={"fas fa-check fa-lg"}
										/>
									</Button>
								</div>
							</div>
					  ))
					: "No unapproved users found."}
			</div>
		</div>
	);
};

export default UsersUI;
