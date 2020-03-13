import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import IssuesUI from "../../presentational/Issues";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";
import issuesConstants from "../../../constants/issuesConstants";
import {
	getIssues,
	getCategories,
	addCategory,
	createIssue,
	issueDeleter,
	issueUpdater
} from "../../../API/Issues";

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
	const [showCategoryModal, setshowCategoryModal] = useState(false);
	const [categoryName, setcategoryName] = useState("");
	const [working, setworking] = useState(false);
	const [showIssueEditor, setshowIssueEditor] = useState(false);
	const [issueToEdit, setissueToEdit] = useState(null);
	const [issueNameToEdit, setissueNameToEdit] = useState("");
	const [issueDescToEdit, setissueDescToEdit] = useState("");

	// Main Issue modal
	const [showIssue, setshowIssue] = useState(false);
	const [activeIssue, setactiveIssue] = useState(null);
	const [issueRes, setissueRes] = useState("");

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
	const toggleCategoryModal = () => setshowCategoryModal(show => !show);
	const toggleIssueEditor = index => {
		setshowIssueEditor(show => !show);
		setissueToEdit(() => {
			let issue =
				index >= 0 && !isNaN(index)
					? sortByCategory(activeCategory)[index]
					: null;
			setissueNameToEdit(issue ? issue.name : "");
			setissueDescToEdit(issue ? issue.desc : "");
			return issue;
		});
	};
	const toggleIssue = issue => {
		setshowIssue(show => !show);
		setactiveIssue(issue ? issue : null);
	};

	const issueCreator = e => {
		e.preventDefault();

		if (
			!issueName ||
			!issueDesc ||
			(issueCategory >= categories.length && !otherReason)
		)
			return toasts.generateError(issuesConstants.INVALIDINPUTS);

		let payLoad = {
			issueName,
			issueDesc,
			issueCategory:
				issueCategory >= categories.length || issueCategory < 0
					? "Others"
					: categories[issueCategory].name,
			institute: state.institute._id,
			department: state.department,
			extraDetails: otherReason
		};

		setworking(true);
		createIssue(payLoad, err => {
			toasts.generateError(err);
			setworking(false);
		})
			.then(res => {
				if (res && res.data && res.status === 201) {
					setissueName("");
					setissueDesc("");
					setissueCategory(0);
					setshowIssueModal(false);
					fetchIssues(); // Refetch issues.
					toasts.generateSuccess(issuesConstants.CREATEDISSUE);
				}
			})
			.then(() => setworking(false));
	};

	const categoryCreator = e => {
		e.preventDefault();

		if (!categoryName)
			return toasts.generateError(issuesConstants.NOCATEGORYNAME);

		setworking(true);
		addCategory(
			categoryName,
			state.department,
			state.institute._id,
			err => {
				toasts.generateError(err);
				setworking(false);
			}
		)
			.then(res => {
				if (res && res.data && res.status === 201) {
					toasts.generateSuccess(issuesConstants.CREATEDCATEGORY);
					setcategories(categ => {
						categ.push(res.data);
						return categ;
					});
					setcategoryName("");
					setshowCategoryModal(false);
					setactiveCategory(0);
				}
			})
			.then(() => setworking(false));
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

		if (Number(activeCategory) === 0) {
			// Issues belonging to all categories.
			filteredIssues =
				activePane === issuesConstants.UNRESOLVED
					? unresIssues
					: resIssues;
		} else if (Number(activeCategory) >= categories.length + 1) {
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
								categories[Number(activeCategory) - 1].name
					  )
					: resIssues.filter(
							issue =>
								issue.category ===
								categories[Number(activeCategory) - 1].name
					  );
		}

		return filteredIssues;
	};

	const deleteIssue = index => {
		if (window.confirm(issuesConstants.SURETODELETE)) {
			issueDeleter(sortByCategory(activeCategory)[index]._id, err =>
				toasts.generateError(err)
			).then(res => {
				if (res && res.data && res.status === 200) {
					toasts.generateSuccess(res.data.message);
					fetchIssues(); // Refetch issues.
				}
			});
		}
	};

	const updateIssue = event => {
		event.preventDefault();
		if (!issueNameToEdit || !issueDescToEdit || !issueToEdit)
			return toasts.generateError("Empty Inputs.");

		setworking(true);

		let payLoad = {
			newName: issueNameToEdit,
			newDesc: issueDescToEdit
		};

		issueUpdater(payLoad, issueToEdit._id, err => {
			toasts.generateError(err);
			setworking(false);
		}).then(res => {
			if (res && res.data && res.status === 200) {
				toasts.generateSuccess(res.data.message);
				setworking(false);
				toggleIssueEditor(null);
				fetchIssues();
			}
		});
	};

	const resolveIssue = (event) => {
		event.preventDefault();
	}

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
			// Category Creation
			categoryCreator={categoryCreator}
			showCategoryModal={showCategoryModal}
			toggleCategoryModal={toggleCategoryModal}
			categoryName={categoryName}
			setcategoryName={setcategoryName}
			// Misc
			working={working}
			deleteIssue={deleteIssue}
			// Editing Issue
			toggleIssueEditor={toggleIssueEditor}
			showIssueEditor={showIssueEditor}
			issueToEdit={issueToEdit}
			issueNameToEdit={issueNameToEdit}
			setissueNameToEdit={setissueNameToEdit}
			issueDescToEdit={issueDescToEdit}
			setissueDescToEdit={setissueDescToEdit}
			updateIssue={updateIssue}
			// Main Issue modal
			showIssue={showIssue}
			activeIssue={activeIssue}
			toggleIssue={toggleIssue}
			issueRes={issueRes}
			setissueRes={setissueRes}
			resolveIssue={resolveIssue}
		/>
	);
};

export default Issues;
