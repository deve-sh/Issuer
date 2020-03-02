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
	},
	MINPASSLENGTH: 8,
	EMAILREG: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
	NAMEREG: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
};

module.exports = appConstants;