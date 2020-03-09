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
	findIssuesByDepartment
} = require("../../helpers");

module.exports = router => {
	router.get(
		`${apiConstants.ISSUEROUTES}${apiConstants.GETISSUES}/`,
		(req, res) => {
			let { authorization } = req.headers;

			if (!authorization) return UNAUTHORISED(res);

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
				else if (!fetchedUser) return error(res, 404, "User not found.");
				else if (!fetchedUser.isApproved || !fetchedUser.isAdmin) return UNAUTHORISED(res);

				// User found, find issues pertaining to the department of the user.
				// Finding Unresolved issues.
				return findIssuesByDepartment(
					fetchedUser.department,
					false,
					(err, issues) => {
						if (err || !issues) return INTERNALSERVERERROR(res);

						return res.json(issues);
					}
				);
			});
		}
	);

	router.get(
		`${apiConstants.ISSUEROUTES}${apiConstants.GETRESOLVEDISSUES}/`,
		(req, res) => {
			let { authorization } = req.headers;

			if (!authorization) return UNAUTHORISED(res);

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
				else if (!fetchedUser) return error(res, 404, "User not found.");
				else if (!fetchedUser.isAdmin || !fetchedUser.isApproved) return UNAUTHORISED(res);

				// User found, find issues pertaining to the department of the user.
				// Finding Resolved issues.
				return findIssuesByDepartment(
					fetchedUser.department,
					true,
					(err, issues) => {
						if (err || !issues) return INTERNALSERVERERROR(res);

						return res.json(issues);
					}
				);
			});
		}
	);
};
