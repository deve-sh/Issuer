// The main place to store all the routes for the app.
const router = require("../router");
const userRoutes = require("./userRoutes")(router);
const instituteRoutes = require("./instituteRoutes")(router);
const issueRoutes = require("./issueRoutes")(router);

router.get("/", (req, res) => {
	res.send("API Connected.");
});