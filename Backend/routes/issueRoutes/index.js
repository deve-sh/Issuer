const constants = require("../../constants");
const apiConstants = require("../../constants/apiConstants");
const instituteConstants = require("../../constants/instituteConstants");
const issueConstants = require("../../constants/issueConstants");
const { message } = require("../../constants");

const { Issue, Category, Resolution } = require("../../model");

const {
	error,
	INTERNALSERVERERROR,
	INVALIDTOKEN,
	UNAUTHORISED,
	INCOMPLETEDETAILS
} = require("../../constants/errors");
const {
	verifyToken,
	findUserById,
	findIssuesByDepartment,
	findIssuesByUser,
	findCategories,
	findIssueById
} = require("../../helpers");

module.exports = router => {
	router.post(
		`${apiConstants.ISSUEROUTES}${apiConstants.GETISSUES}/`,
		(req, res) => {
			let { authorization } = req.headers;
			let { isResolved } = req.body;

			if (!authorization) return UNAUTHORISED(res);
			if (!isResolved) isResolved = false;

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else {
					user = { ...decoded };
				}
			});

			if (hasError) return INVALIDTOKEN(res); // Illegal Token.

			// Now fetch other details of the user.

			return findUserById(user._id, (err, fetchedUser) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!fetchedUser)
					return error(res, 404, "User not found.");
				else if (!fetchedUser.isApproved) return UNAUTHORISED(res);

				// User found, find issues pertaining to the department of the user.
				const response = (err, issues) => {
					if (err || !issues) return INTERNALSERVERERROR(res);
					return res.json(issues);
				};

				if (fetchedUser.isAdmin || fetchedUser.isHead) {
					return findIssuesByDepartment(
						fetchedUser.department,
						isResolved,
						response
					);
				} else {
					// Return the issues created by the user.
					return findIssuesByUser(
						user._id,
						fetchedUser.department,
						isResolved,
						response
					);
				}
			});
		}
	);

	router.post(
		`${apiConstants.ISSUEROUTES}${apiConstants.GETCATEGORIES}`,
		(req, res) => {
			let { department, institute } = req.body;

			if (!department || !institute) return INCOMPLETEDETAILS(res);

			return findCategories(department, institute, (err, categories) => {
				if (err || !categories) return INTERNALSERVERERROR(res);

				res.json(categories);
			});
		}
	);

	router.post(
		`${apiConstants.ISSUEROUTES}${apiConstants.ADDCATEGORY}`,
		(req, res) => {
			let { authorization } = req.headers;
			let { categoryName, department, institute } = req.body;

			if (!authorization) return UNAUTHORISED(res);
			else if (!categoryName || !department || !institute)
				return INTERNALSERVERERROR(res);

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else {
					user = { ...decoded };
				}
			});

			if (hasError) return INVALIDTOKEN(res); // Illegal Token.

			return findUserById(user._id, (err, fetchedUser) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!fetchedUser)
					return error(res, 404, "User not found.");
				else if (
					!fetchedUser.isApproved ||
					(!fetchedUser.isAdmin && !fetchedUser.isHead)
				)
					return UNAUTHORISED(res);

				return findCategories(
					department,
					institute,
					(err, categories) => {
						let isAlreadyThere = false;

						for (let category of categories) {
							if (category.name === categoryName) {
								isAlreadyThere = true;
								break;
							}
						}

						if (isAlreadyThere)
							return error(
								res,
								400,
								"Category with the same name is already present!"
							);

						let newCategory = new Category({
							name: categoryName,
							institute,
							department
						});

						return newCategory.save(err => {
							if (err) return INTERNALSERVERERROR(res);
							return res.status(201).json(newCategory);
						});
					}
				);
			});
		}
	);

	router.post(
		`${apiConstants.ISSUEROUTES}${apiConstants.CREATEISSUE}`,
		(req, res) => {
			let { authorization } = req.headers;
			let {
				institute,
				department,
				issueName,
				issueDesc,
				issueCategory,
				extraDetails
			} = req.body;

			if (!authorization) return UNAUTHORISED(res);
			else if (
				!institute ||
				!department ||
				!issueName ||
				!issueDesc ||
				!issueCategory
			)
				return INCOMPLETEDETAILS(res);

			if (!extraDetails) extraDetails = "";

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else {
					user = { ...decoded };
				}
			});

			if (hasError) return INVALIDTOKEN(res); // Illegal Token.

			return findUserById(user._id, (err, fetchedUser) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!fetchedUser)
					return error(res, 404, "User not found.");
				else if (
					!fetchedUser.isApproved ||
					fetchedUser.isAdmin ||
					fetchedUser.isHead ||
					fetchedUser.institute.toString() !== institute ||
					fetchedUser.department.toString() !== department ||
					!fetchedUser.canPostComplaints
				)
					return UNAUTHORISED(res); // An admin or head can't create an issue.

				let newIssue = new Issue({
					name: issueName,
					desc: issueDesc,
					creator: user._id,
					isResolved: false,
					createdOn: new Date().getTime(),
					department,
					institute,
					extraDetails,
					category: issueCategory
				});

				return newIssue.save(err => {
					if (err) return INTERNALSERVERERROR(res);
					else res.status(201).json(newIssue);
				});
			});
		}
	);

	router.patch(
		`${apiConstants.ISSUEROUTES}${apiConstants.UPDATEISSUE}/:issueId/`,
		(req, res) => {
			let { authorization } = req.headers;
			let { issueId } = req.params;
			let { newName, newDesc, newCategory } = req.body;

			if (!authorization) return UNAUTHORISED(res);
			else if (!newName && !newDesc && !newCategory)
				return INCOMPLETEDETAILS(res);

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else {
					user = { ...decoded };
				}
			});

			if (hasError) return INVALIDTOKEN(res); // Illegal Token.

			return findIssueById(issueId, (err, issue) => {
				if (err || !issue) return INTERNALSERVERERROR(res);

				if (user._id !== issue.creator.toString())
					return UNAUTHORISED(res);

				if (newName) issue.name = newName;
				if (newDesc) issue.desc = newDesc;
				if (newCategory) issue.category = newCategory;

				return issue.save(err => {
					if (err) return INTERNALSERVERERROR(res);
					return message(res, 200, "Updated Issue Successfully.");
				});
			});
		}
	);

	router.delete(
		`${apiConstants.ISSUEROUTES}${apiConstants.DELETEISSUE}/:issueId/`,
		(req, res) => {
			let { authorization } = req.headers;
			let { issueId } = req.params;

			if (!authorization) return UNAUTHORISED(res);

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else user = { ...decoded };
			});

			if (hasError) return INVALIDTOKEN(res); // Illegal Token.

			return findIssueById(issueId, (err, issue) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!issue) return error(res, 404, "Issue Not Found!");

				if (user._id !== issue.creator.toString()) {
					// Checking if the user is an admin or head or not.
					return findUserById(user._id, (err, fetchedUser) => {
						if (err) return INTERNALSERVERERROR(res);
						else if (!fetchedUser)
							return error(res, 404, "User not found!");

						if (!fetchedUser.isAdmin && !fetchedUser.isHead)
							return UNAUTHORISED(res);

						return Issue.deleteOne({ _id: issueId }, err => {
							if (err) return INTERNALSERVERERROR(res);
							else
								return message(
									res,
									200,
									"Deleted Issue Successfully."
								);
						});
					});
				} else {
					return Issue.deleteOne({ _id: issueId }, err => {
						if (err) return INTERNALSERVERERROR(res);
						else
							return message(
								res,
								200,
								"Deleted Issue Successfully."
							);
					});
				}
			});
		}
	);

	router.post(
		`${apiConstants.ISSUEROUTES}${apiConstants.RESOLVEISSUE}/:issueId/`,
		(req, res) => {
			let { authorization } = req.headers;
			let { resolution } = req.body;

			if (!authorization) return UNAUTHORISED(res);
			else if (!resolution) return INCOMPLETEDETAILS(res);

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else user = { ...decoded };
			});

			return findUserById(user._id, (err, fetchedUser) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!fetchedUser)
					return error(res, 404, "User not found!");

				if (
					(!fetchedUser.isAdmin && !fetchedUser.isHead) ||
					!fetchedUser.isApproved
				)
					return UNAUTHORISED(res);

				return findIssueById(issueId, (err, issue) => {
					if (err) return INTERNALSERVERERROR(res);
					else if (!issue) return error(res, 404, "Issue Not found!");
					else if (
						issue.institute.toString() !==
							fetchedUser.institute.toString() ||
						issue.department.toString() !==
							fetchedUser.department.toString()
					)
						return UNAUTHORISED(res);

					if (issue.isResolved)
						return error(res, 400, "Issue already resolved.");

					let newRes = new Resolution({
						resolution: resolution,
						resolvedBy: fetchedUser._id,
						issue: issueId,
						createdOn: new Date().getTime()
					});

					return newRes.save(err => {
						if(err) return INTERNALSERVERERROR(res);

						issue.isResolved = true;

						return issue.save(err => {
							if(err) return error(res, 500, "Issue resolved but could not be saved. Kindly refresh.");

							return res.status(201).json(resolution);
						})
					});
				});
			});
		}
	);
};
