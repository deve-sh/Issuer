const initialState = {
	isAuthenticated : false,
	isAdmin: false,
	isHead: false,
	isApproved: false,
	canPostComplaints: false,
	_id: "",
	name: "",
	email: "",
	institute: null,
	institutes: null,
	department: null,
	hasFetchedInstitutes: false
};

export default initialState;