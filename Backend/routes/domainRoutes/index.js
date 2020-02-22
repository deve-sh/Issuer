const constants = require("../../constants");
const apiConstants = require("../../constants/apiConstants");
const domainConstants = require("../../constants/domainConstants");
const { message } = require("../../constants");
const {
	error,
	INTERNALSERVERERROR,
	INVALIDTOKEN,
	UNAUTHORISED,
	INCOMPLETEDETAILS
} = require("../../constants/errors");
const {
	isValidDomain,
	findDomain
} = require("../../helpers");

const domainRoutes = router => {
	router.get(
		`${apiConstants.DOMAINROUTES}${apiConstants.ISVALIDURL}/:domain/`,
		(req, res) => {
			let { domain } = req.params;
			if (isValidDomain(domain))
				return message(res, 200, domainConstants.VALIDDOMAIN);
			else return error(res, 404, domainConstants.INVALIDDOMAIN);
		}
	);

	router.get(
		`${apiConstants.DOMAINROUTES}${apiConstants.GETDEPARTMENTS}/:domain/`,
		(req, res) => {
			let { domain } = req.params;

			// Get the departments from the database.
			return findDomain(domain, (err, domains) => {
				if(err) return INTERNALSERVERERROR(res);
				else if(!domains || !domains[0]) return error(res, 404, domainConstants.INVALIDDOMAIN);

				let { departments } = domains[0];
				res.json(departments);
			});
		}
	);
};

module.exports = domainRoutes;
