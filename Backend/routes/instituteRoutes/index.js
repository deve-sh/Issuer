const constants = require("../../constants");
const apiConstants = require("../../constants/apiConstants");
const instituteConstants = require("../../constants/instituteConstants");
const { message } = require("../../constants");
const {
	error,
	INTERNALSERVERERROR,
	INVALIDTOKEN,
	UNAUTHORISED,
	INCOMPLETEDETAILS
} = require("../../constants/errors");
const { Institute } = require("../../model");

module.exports = router => {
	// Routes regarding institutes and their departments.
	router.get(`${apiConstants.INSTITUTEROUTES}/getinstitutes/`, (req, res) => {
		return Institute.find({}, (err, institutes) => {
			if (err) return INTERNALSERVERERROR(res);
			return res.json(institutes);
		});
	});
};
