const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

const mailer = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAILEMAIL,
		pass: process.env.MAILPASS
	}
});

const constants = require("../../constants");
const apiConstants = require("../../constants/apiConstants");
const { message } = require("../../constants");
const {
	error,
	INTERNALSERVERERROR,
	INVALIDTOKEN,
	UNAUTHORISED,
	INCOMPLETEDETAILS
} = require("../../constants/errors");
const { User } = require("../../model");
const {
	findUsers,
	findInstitute,
	findUsersByPhoneOrEmail,
	findUsersForDepartment,
	verifyToken,
	findUserById,
	findUnapprovedUsers,
	generatePassword
} = require("../../helpers");

const userRoutes = router => {
	router.post(
		`${apiConstants.USERROUTES}${apiConstants.REGISTERROUTE}`,
		(req, res) => {
			let {
				name,
				institute,
				email,
				password,
				department,
				phone
			} = req.body;

			if (
				!name ||
				!institute ||
				!email ||
				!password ||
				!department ||
				!phone
			)
				return INCOMPLETEDETAILS(res);

			// Verifying Email and Password

			if (!constants.EMAILREG.test(email))
				return error(res, 400, "Invalid Email.");

			if (password.length < constants.MINPASSLENGTH)
				return error(res, 400, "Password Too Short!");

			// Finding Institute and department.

			return findInstitute(institute, (err, foundInst) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!foundInst)
					return error(res, 404, "Institute Not Found!");

				if (!foundInst.departments.includes(department))
					return error(res, 404, "Department Not Found!");

				// Checking if a user exists with the same email or phone

				return findUsersByPhoneOrEmail(email, phone, (err, users) => {
					if (err) return INTERNALSERVERERROR(res);
					else if (users.length > 0)
						return error(
							res,
							400,
							"User with the given email or phone already exists."
						);

					// Now checking if the user is the first user of the department.

					return findUsersForDepartment(department, (err, users) => {
						let [isHead, isAdmin, isApproved] = [
							false,
							false,
							false
						];

						if (err) return INTERNALSERVERERROR(res);
						else if (users.length <= 0)
							[isHead, isAdmin, isApproved] = [true, true, true];

						// Hashing Password

						try {
							password = bcrypt.hashSync(password, 12);
						} catch (err) {
							return INTERNALSERVERERROR(res);
						}

						let user = new User({
							name,
							email,
							institute,
							phone,
							password,
							department,
							isHead,
							isAdmin,
							isApproved,
							canPostComplaints: isAdmin || isHead ? false : true,
							joinedAt: new Date().getTime()
						});

						return user.save(err => {
							if (err) return INTERNALSERVERERROR(res);

							return message(
								res,
								201,
								"Successfully Registered User."
							);
						});
					});
				});
			});
		}
	);

	router.post(
		`${apiConstants.USERROUTES}${apiConstants.LOGINROUTE}`,
		(req, res) => {
			let { email, password, institute } = req.body;

			if (!email || !password || !institute)
				return INCOMPLETEDETAILS(res);

			// Finding the user

			return findUsersByPhoneOrEmail(email, email, (err, users) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!users || users.length <= 0)
					return error(res, 404, "User Not Found.");

				let user = users[0];

				if (institute !== user.institute.toString())
					return UNAUTHORISED(res);

				let jwtPayload = {
					email: user.email,
					name: user.name,
					_id: user._id,
					institute: user.institute,
					department: user.department
				};

				// Encrypting the JSON Web Token.
				let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

				return res.json({
					token,
					department: user.department,
					name: user.name,
					email: user.email,
					canPostComplaints: user.canPostComplaints,
					isHead: user.isHead,
					isAdmin: user.isAdmin,
					isApproved: user.isApproved
				});
			});
		}
	);

	router.get(
		`${apiConstants.USERROUTES}${apiConstants.MEROUTE}`,
		(req, res) => {
			let { authorization } = req.headers; // Auth Token

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
				else if (!user) return error(res, 404, "User not found.");
				return res.json(fetchedUser);
			});
		}
	);

	router.get(
		`${apiConstants.USERROUTES}${apiConstants.UNAPPROVEDUSERS}/:institute/:department/`,
		(req, res) => {
			let { authorization } = req.headers;
			let { institute, department } = req.params;

			if (!authorization) return UNAUTHORISED(res);
			else if (!institute || !department) return INCOMPLETEDETAILS(res);

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else {
					user = { ...decoded };
				}
			});

			if (hasError) return INVALIDTOKEN(res);

			return findUserById(user._id, (err, fetchedUser) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!fetchedUser)
					return error(res, 404, "User Not Found!");
				else if (
					fetchedUser.institute.toString() !== institute ||
					fetchedUser.department.toString() !== department ||
					!fetchedUser.isHead
				) {
					console.log(
						fetchedUser.institute.toString() !== institute,
						fetchedUser.department.toString() !== department
					);
					return UNAUTHORISED(res);
				}

				return findUnapprovedUsers(
					institute,
					department,
					(err, users) => {
						if (err) return INTERNALSERVERERROR(res);

						return res.json(users);
					}
				);
			});
		}
	);

	router.patch(
		`${apiConstants.USERROUTES}${apiConstants.APPROVEUSER}/:usertoapprove/`,
		(req, res) => {
			let { authorization } = req.headers;
			let { usertoapprove } = req.params;
			let { isAdmin, institute, department } = req.body;

			if(!isAdmin) isAdmin = false;

			let user = null,
				hasError = false;

			verifyToken(authorization, (err, decoded) => {
				if (err) hasError = true;
				else {
					user = { ...decoded };
				}
			});

			if (hasError) return INVALIDTOKEN(res);

			return findUserById(user._id, (err, user) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!user) return error(res, 404, "User Not Found!");

				if (
					user.institute.toString() !== institute ||
					user.department.toString() !== department ||
					!user.isHead
				)
					return UNAUTHORISED(res);

				return findUserById(usertoapprove, (err, fetchedUser) => {
					if (err) return INTERNALSERVERERROR(res);
					else if (!fetchedUser)
						return error(res, 404, "User Not Found!");

					if (
						fetchedUser.isHead ||
						fetchedUser.isAdmin ||
						fetchedUser.institute.toString() !== institute ||
						fetchedUser.department.toString() !== department
					)
						return error(res, 400, "Cannot approve the user.");
					if (fetchedUser.isApproved)
						return error(res, 400, "User Already Approved.");
					else {
						fetchedUser.isApproved = true;
						fetchedUser.isAdmin = isAdmin;

						return fetchedUser.save(err => {
							if (err) return INTERNALSERVERERROR(res);

							return message(
								res,
								200,
								"Successfully Approved User."
							);
						});
					}
				});
			});
		}
	);

	router.patch(
		`${apiConstants.USERROUTES}${apiConstants.RESETPASS}`,
		(req, res) => {
			let { email } = req.body;

			if (!email) return INCOMPLETEDETAILS(res);

			return findUsersByPhoneOrEmail(email, email, (err, users) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (
					!users ||
					users.length <= 0 ||
					users.length > 1 ||
					!Array.isArray(users)
				)
					return error(res, 404, "User not found in our database.");

				let user = users[0];

				let oldPass = user.password,
					newPassword = generatePassword();

				let hashedPass = null;

				try {
					hashedPass = bcrypt.hashSync(newPassword, 12);
				} catch (err) {
					return INTERNALSERVERERROR(res);
				}

				// First saving the new password to the user.

				user.password = hashedPass;

				return user.save(err => {
					if (err) return INTERNALSERVERERROR(res);

					// Sending email to the registered email with the updated password.

					const mailOptions = {
						from: process.env.MAILEMAIL,
						to: user.email,
						subject: "Password Updated",
						html:
							"Updated Password is <strong>" +
							newPassword +
							"</strong>."
					};

					return mailer.sendMail(mailOptions, (error, info) => {
						if (error) {
							user.password = oldPass;
							return user.save(err => {
								if (err) return INTERNALSERVERERROR(res);
								else
									return error(
										res,
										500,
										"Could not update password. Kindly Try again."
									);
							});
						} else {
							return message(
								res,
								200,
								"Successfully Updated Password. Email Sent."
							);
						}
					});
				});
			});
		}
	);
};

module.exports = userRoutes;
