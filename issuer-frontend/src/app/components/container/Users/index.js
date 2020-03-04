import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUnapprovedUsers } from "../../../API/Users";
import toasts from "../../../constants/toastConstants";
import UsersUI from "../../presentational/Users";

const Users = props => {
	const [users, setusers] = useState([]);
	const state = useSelector(state => state);

	const getUsers = () => {
		getUnapprovedUsers(state.institute, state.department, err =>
			toasts.generateError(err)
		).then(res => {
			if (res && res.data) setusers(res.data);
		});
	};

	useEffect(() => {
		getUsers();
	}, []);

	return <UsersUI users={users} />;
};

export default Users;
