const constants = require("./index");

module.exports = {
	error: (res, status, error) => {
		return res.status(status).json({
			error
		});
	},
	INTERNALSERVERERROR: (res) => {
		return res.status(500).json({
			error: constants.INTERNALSERVERERROR
		});
	},
	INVALIDTOKEN: (res) => {
		return res.status(403).json({
			error: constants.INVALIDTOKEN
		});
	},
	UNAUTHORISED: (res) => {
		return res.status(403).json({
			error: constants.UNAUTHORISED
		});
	},
	INCOMPLETEDETAILS: (res) => {
		return res.status(400).json({
			error: constants.INCOMPLETEDETAILS
		});
	}
}