import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import IssuesUI from "../../presentational/Issues";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";
import issuesConstants from "../../../constants/issuesConstants";
import { getIssues } from "../../../API/Issues";

const Issues = props => {
	const state = useSelector(state => state);
	const [resIssues, setresIssues] = useState(null);
	const [unresIssues, setunresIssues] = useState(null);
	const [loading, setloading] = useState(false);
	const [isMounted, setisMounted] = useState(true);
	const [activePane, setactivePane] = useState(issuesConstants.UNRESOLVED);

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

	const switchPane = (newActivePane = issuesConstants.UNRESOLVED) => {
		setactivePane(newActivePane);
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
			activePane={activePane}
			switchPane={switchPane}
			issuesList={
				activePane === issuesConstants.RESOLVED
					? resIssues
					: unresIssues
			}
		/>
	);
};

export default Issues;
