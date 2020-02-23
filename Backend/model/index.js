const Model = require("mongoose").model;
const Schemas = require("./schemas");

module.exports = {
	User: Model("IssuerUser", Schemas.UserSchema),
	Domain: Model("IssuerDomain", Schemas.DomainSchema),
	Issue: Model("IssuerIssue", Schemas.IssueSchema),
	Resolution: Model("IssuerResolution", Schemas.ResolutionSchema)
};