const constants = require("../../constants");
const apiConstants = require("../../constants/apiConstants");
const instituteConstants = require("../../constants/instituteConstants");
const issueConstants = require("../../constants/issueConstants");
const { message } = require("../../constants");
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
	findCategories
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

				if (user.isAdmin || user.isHead) {
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

	router.post(`${apiConstants.ISSUEROUTES}${apiConstants.GETCATEGORIES}`, (req, res) => {
		let { department, institute } = req.body;

		if (!department || !institute) return INCOMPLETEDETAILS(res);

		return findCategories(department, institute, (err, categories) => {
			if(err || !categories) return INTERNALSERVERERROR(res);

			res.json(categories);
		});
	});
};
