const constants = require("../constants");
const { User, Institute } = require("../model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	findUsers: (email, callback = () => {}) => {
		User.find({ email }, (err, users) => {
			if (err) return callback(err);
			else return callback(null, users);
		});
	},
	findUsersByPhoneOrEmail: (email, phone, callback = () => {}) => {
		if (email && phone && callback) {
			User.find(
				{
					$or: [{ email }, { phone }]
				},
				(err, users) => callback(err, users)
			);
		}
	},
	findUsersForDepartment: (department, callback = () => {}) => {
		if (department && callback) {
			User.find({ department }, (err, users) => callback(err, users));
		}
	},
	findUserById: (userid, callback = () => {}) => {
		if (userid && callback) {
			User.findById(userid)
				.select({ __v: 0 })
				.exec((err, user) => callback(err, user));
		}
	},
	findInstitute: (instid, callback = () => {}) => {
		Institute.findById(instid, (err, inst) => callback(err, inst));
	},
	verifyToken: (token, callback = () => {}) => {
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
			if (
				!decoded._id ||
				!decoded.name ||
				!decoded.institute ||
				!decoded.email ||
				!decoded.department
			)
				return callback(true); // Token invalid or tampered with.
		} catch (err) {
			return callback(err);
		}
		return callback(null, decoded);
	}
};
