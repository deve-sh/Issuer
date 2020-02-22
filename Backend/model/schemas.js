const Schema = require("mongoose").Schema;

module.exports = {
	DomainSchema: new Schema({
		domain: { type: String, required: true, unique: true },
		departments: { type: Array, required: true, default: [] },
		name: { type: String, required: true, unique: true }
	}),
	UserSchema: new Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		signUpTime: {
			type: Number,
			default: new Date().getTime(),
			required: true
		},
		isHead: {
			type: Boolean,
			default: false
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		canPostComplaints: {
			type: Boolean,
			default: false
		},
		isApproved: {
			type: Boolean,
			default: false
		}
	})
};
