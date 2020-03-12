const apiConstants = {
	API: "/api",
	// Sub API Routes
	DOMAINROUTES: "/domains",
	USERROUTES: "/users",
	INSTITUTEROUTES: "/institutes",
	ISSUEROUTES: "/issues",

	// Sub-Sub API Routes
	LOGINROUTE: "/login/",
	MEROUTE: "/me/",
	RESETPASS: "/resetpass/",
	UPDATEPASS: "/updatepass/",
	UNAPPROVEDUSERS: "/getunapprovedusers",
	APPROVEUSER: "/approveuser/",
	REGISTERROUTE: "/register/",
	ISVALIDURL: "/isvalidurl",
	GETDEPARTMENTS: "/getdepartments",
	GETISSUES: "/getissues",
	GETCATEGORIES: "/getcategories",
	GETRESOLVEDISSUES: "/getresolvedissues",
	ADDCATEGORY: "/addcategory",
	CREATEISSUE: "/createissue",
	UPDATEISSUE: "/updateissue",
	DELETEISSUE: "/deleteissue"
};

module.exports = apiConstants;