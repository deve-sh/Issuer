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

const userRoutes = router => {
	router.post(
		`${apiConstants.API}/${apiConstants.USERROUTES}/${apiConstants.LOGINROUTE}`,
		(req, res) => {}
	);
};

module.exports = userRoutes;
