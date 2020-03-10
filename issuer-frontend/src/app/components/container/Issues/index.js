import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import IssuesUI from "../../presentational/Issues";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";
import issuesConstants from "../../../constants/issuesConstants";
import { getIssues, getCategories } from "../../../API/Issues";

const Issues = props => {
	const state = useSelector(state => state);
	const [resIssues, setresIssues] = useState(null);
	const [unresIssues, setunresIssues] = useState(null);
	const [categories, setcategories] = useState([]);
	const [loading, setloading] = useState(false);
	const [isMounted, setisMounted] = useState(true);
	const [activePane, setactivePane] = useState(issuesConstants.UNRESOLVED);
	const [showIssueModal, setshowIssueModal] = useState(false);
	const [issueName, setissueName] = useState("");
	const [issueDesc, setissueDesc] = useState("");
	const [issueCategory, setissueCategory] = useState(0);
	const [otherReason, setotherReason] = useState("");
	const [activeCategory, setactiveCategory] = useState(0);

	const fetchIssues = () => {
		setloading(true);
		getIssues(true, err => {
			toasts.generateError(err);
			setloading(false);
		}).then(res => {
			if (res && res.data && res.status === 200 && isMounted) {
				setresIssues(res.data);

				if (isMounted) {
					getIssues(false, err => {
						toasts.generateError(err);
						setloading(false);
					}).then(res => {
						if (
							res &&
							res.data &&
							res.status === 200 &&
							isMounted
						) {
							setunresIssues(res.data);

							getCategories(
								state.department,
								state.institute._id,
								err => {
									toasts.generateError(err);
									setloading(false);
								}
							)
								.then(res => {
									if (res && res.data && res.status === 200)
										setcategories(res.data);
								})
								.then(() =>
									isMounted ? setloading(false) : null
								);
						}
					});
				}
			}
		});
	};

	const switchPane = (newActivePane = issuesConstants.UNRESOLVED) => {
		setactivePane(newActivePane);
	};

	const toggleIssueModal = () => setshowIssueModal(show => !show);

	const issueCreator = e => {
		e.preventDefault();
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

	const sortByCategory = activeCategory => {
		// Function to return a filter of activeCategory
		let filteredIssues = [];

		if (activeCategory === 0) {
			// Issues belonging to all categories.
			filteredIssues =
				activePane === issuesConstants.UNRESOLVED
					? unresIssues
					: resIssues;
		} else if (activeCategory === categories.length + 1) {
			// Issues belonging to others.
			filteredIssues =
				activePane === issuesConstants.UNRESOLVED
					? unresIssues.filter(issue => issue.category === "Others")
					: resIssues.filter(issue => issue.category === "Others");
		} else {
			// Issues belonging to a certain category.
			filteredIssues =
				activePane === issuesConstants.UNRESOLVED
					? unresIssues.filter(
							issue =>
								issue.category ===
								categories[activeCategory].name
					  )
					: resIssues.filter(
							issue =>
								issue.category ===
								categories[activeCategory].name
					  );
		}

		return filteredIssues;
	};

	return (
		<IssuesUI
			isAdmin={state.isAdmin}
			isHead={state.isHead}
			isApproved={state.isApproved}
			loading={loading}
			resIssues={resIssues}
			unresIssues={unresIssues}
			activePane={activePane}
			switchPane={switchPane}
			issuesList={sortByCategory(activeCategory)}
			// Issue Creation
			showIssueModal={showIssueModal}
			toggleIssueModal={toggleIssueModal}
			issueCreator={issueCreator}
			issueName={issueName}
			setissueName={setissueName}
			issueDesc={issueDesc}
			setissueDesc={setissueDesc}
			issueCategory={issueCategory}
			setissueCategory={setissueCategory}
			categories={categories}
			otherReason={otherReason}
			setotherReason={setotherReason}
			activeCategory={activeCategory}
			setactiveCategory={setactiveCategory}
		/>
	);
};

export default Issues;
