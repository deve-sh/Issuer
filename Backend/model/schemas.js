const Schema = require("mongoose").Schema;

module.exports = {
	InstituteSchema: new Schema({
		departments: { type: Array, required: true, default: [] },
		name: { type: String, required: true, unique: true }
	}),
	UserSchema: new Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		department: { type: String, required: true },
		joinedAt: { type: Number, default: new Date().getTime() },
		institute: {
			type: Schema.Types.ObjectId,
			ref: "IssuerInstitute",
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
		isApproved: {
			type: Boolean,
			default: false
		},
		canPostComplaints: {
			type: Boolean,
			default: false
		}
	}),
	IssueSchema: new Schema({
		name: { type: String, required: true },
		creator: {
			type: Schema.Types.ObjectId,
			ref: "IssuerUser",
			required: true
		},
		desc: { type: String, default: "", required: true },
		institute: {
			type: Schema.Types.ObjectId,
			ref: "IssuerInstitute",
			required: true
		},
		isResolved: { type: Boolean, default: false },
		createdOn: { type: Number, default: new Date().getTime() },
		department: { type: String, required: true }
	}),
	ResolutionSchema: new Schema({
		resolution: { type: String, required: true },
		issue: {
			type: Schema.Types.ObjectId,
			ref: "IssuerIssue",
			required: true
		},
		createdOn: {
			type: Number,
			default: new Date().getTime()
		},
		resolvedBy: {
			type: Schema.Types.ObjectId,
			ref: "IssuerUser",
			required: true
		}
	})
};
