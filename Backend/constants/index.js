const appConstants = {
	DOMAINS: ["fcp", "bmcc"],	// Edit this to add or remove valid subdomains from the frontend.
	INTERNALSERVERERROR: "Some error occured during execution, kindly try again.",
	INVALIDTOKEN: "Invalid Token.",
	UNAUTHORISED: "You are not authorised.",
	INCOMPLETEDETAILS: "Incomplete Information Sent.",
	message: (res, status, message) => {
		return res.status(status).json({
			message
		});
	}
};

module.exports = appConstants;