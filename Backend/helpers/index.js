const constants = require("../constants");
const { User, Domain } = require("../model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	isValidDomain: domain => constants.DOMAINS.includes(domain),
	findDomain: (domain, callback = () => {}) => {
		if (domain && callback) {
			Domain.find({ domain }, (err, domains) => callback(err, domains));
		}
	},
	findUsers: (email, callback = () => {}) => {
		User.find({ email }, (err, users) => {
			if (err) return callback(err);
			else return callback(null, users);
		});
	},
	verifyToken: (token, callback = () => {}) => {
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
			if (!decoded.id || !decoded.name || !decoded.email)
				return callback(true); // Token invalid or tampered with.
		} catch (err) {
			return callback(err);
		}
		return callback(null, decoded);
	}
};
