import React from "react";

import Button from "../../reusables/Button";
import Icon from "../../reusables/Icon";
import Loader from "../../reusables/Loader";
import NoneFound from "../../reusables/NoneFound";

const UsersUI = props => {
	return (
		<div className={"users-container"}>
			<div className={"fixedcontainer users"}>
				<div className={"heading extraweight"}>Unapproved Users</div>
				{props.loading ? (
					<Loader />
				) : props.users && props.users.length > 0 ? (
					props.users.map((user, index) => (
						<div className={"user row"} key={index}>
							<div className={"col-6 userdetails"}>
								<div className={"username"}>{user.name}</div>
								<div className={"useremail"}>{user.email}</div>
								<div className={"userdepartment"}>
									{user.department}
								</div>
								<div className={"userjoinedat"}>
									{new Date(user.joinedAt).toDateString()}
								</div>
							</div>
							<div className={"col-5 useroptions"}>
								<label>Is Admin?</label>
								<br />
								<select
									onChange={e =>
										props.setUserAdmin(
											index,
											e.target.value
										)
									}
									className={"form-control dropdown"}
									defaultValue={
										user.isAdmin ? "true" : "false"
									}
								>
									<option value={false}>No</option>
									<option value={true}>Yes</option>
								</select>
							</div>
							<div className={"col-1 userapprove"}>
								<Button
									className={"accessibility"}
									title={"Approve User"}
									onClick={() =>
										props.userApprover(index)
									}
								>
									<Icon className={"fas fa-check fa-lg"} />
								</Button>
							</div>
						</div>
					))
				) : (
					<NoneFound>
						No unapproved users found.
					</NoneFound>
				)}
			</div>
		</div>
	);
};

export default UsersUI;
