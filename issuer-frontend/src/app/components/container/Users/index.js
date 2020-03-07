import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUnapprovedUsers, approveUser } from "../../../API/Users";
import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";
import UsersUI from "../../presentational/Users";

const Users = props => {
	const [users, setusers] = useState([]);
	const state = useSelector(state => state);
	const [loading, setloading] = useState(false);

	const getUsers = () => {
		console.log(state);
		setloading(true);
		getUnapprovedUsers(state.institute._id, state.department, err =>
			toasts.generateError(err)
		)
			.then(res => {
				if (res && res.data) setusers(res.data);
			})
			.then(() => setloading(false));
	};

	const userApprover = (userindex = null) => {
		if (userindex >= 0 && userindex < users.length) {
			let payload = {
				isAdmin: users[userindex].isAdmin,
				institute: users[userindex].institute,
				department: users[userindex].department
			};

			approveUser(users[userindex]._id, payload, err =>
				toasts.generateError(err)
			).then(res => {
				if (res && res.data && res.status === 200) {
					toasts.generateSuccess(res.data.message);
					getUsers(); // Fetch users again.
				}
			});
		}
	};

	const setUserAdmin = (userindex, isAdmin = false) => {
		setusers(users => {
			let userToEdit = users[userindex];
			userToEdit.isAdmin = isAdmin === "true" ? true : false;
			return [
				...users.slice(0, userindex),
				userToEdit,
				...users.slice(userindex + 1)
			];
		});
	};

	useEffect(() => {
		document.title = constants.APPNAME + " - Unapproved Users";
		getUsers();

		return () => {
			document.title = constants.APPNAME;
		};
	}, []);

	return (
		<UsersUI
			loading={loading}
			users={users}
			userApprover={userApprover}
			setUserAdmin={setUserAdmin}
		/>
	);
};

export default Users;
