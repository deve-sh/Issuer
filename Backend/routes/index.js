// The main place to store all the routes for the app.
const router = require("../router");

const domainRoutes = require("./domainRoutes")(router);
const userRoutes = require("./userRoutes")(router);
const instituteRoutes = require("./instituteRoutes")(router);

router.get("/", (req, res) => {
	res.send("API Connected.");
});