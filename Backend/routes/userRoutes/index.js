const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

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
	findUsersForDepartment
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
			let { email, password } = req.body;

			if (!email || !password) return INCOMPLETEDETAILS(res);

			// Finding the user

			return findUsersByPhoneOrEmail(email, email, (err, users) => {
				if (err) return INTERNALSERVERERROR(res);
				else if (!users || users.length <= 0)
					return error(res, 404, "User Not Found.");

				let user = users[0];

				let jwtPayload = {
					email: user.email,
					_id: user._id,
					institute: user.institute,
					department: user.department
				};

				// Encrypting the JSON Web Token.
				let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

				return res.json({ token });
			});
		}
	);
};

module.exports = userRoutes;
