const Model = require("mongoose").model;
const Schemas = require("./schemas");

module.exports = {
	User: Model("IssuerUser", Schemas.UserSchema),
	Institute: Model("IssuerInstitute", Schemas.InstituteSchema),
	Issue: Model("IssuerIssue", Schemas.IssueSchema),
	Resolution: Model("IssuerResolution", Schemas.ResolutionSchema),
	Category: Modal("IssuerCategory", Schemas.CategorySchema)
};
