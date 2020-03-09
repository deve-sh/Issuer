import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import IssuesUI from "../../presentational/Issues";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";
import { getIssues } from "../../../API/Issues";

const Issues = props => {
	const state = useSelector(state => state);
	const [resIssues, setresIssues] = useState(null);
	const [unresIssues, setunresIssues] = useState(null);
	const [loading, setloading] = useState(false);
	const [isMounted, setisMounted] = useState(true);

	const fetchIssues = () => {
		setloading(true);
		getIssues(true, err => toasts.generateError(err)).then(res => {
			if (res && res.data && res.status === 200 && isMounted) {
				setresIssues(res.data);

				if (isMounted) {
					getIssues(false, err => toasts.generateError(err))
						.then(res => {
							if (
								res &&
								res.data &&
								res.status === 200 &&
								isMounted
							)
								setunresIssues(res.data);
						})
						.then(() => (isMounted ? setloading(false) : null));
				}
			}
		});
	};

	useEffect(() => {
		document.title = constants.APPNAME + " - Issues";
		// Todo : Get the resolved and unresolved issues for the department for the admin.
		// Whereas the resolved and unresolved issues for the user if they are not an admin.
		fetchIssues();

		return () => {
			document.title = constants.APPNAME;
			setisMounted(false);
		};
	}, []);

	return (
		<IssuesUI
			isAdmin={state.isAdmin}
			isApproved={state.isApproved}
			loading={loading}
			resIssues={resIssues}
			unresIssues={unresIssues}
		/>
	);
};

export default Issues;
