// The main place to store all the routes for the app.
const router = require("../router");

const domainRoutes = require("./domainRoutes")(router);

router.get("/", (req, res) => {
	res.send("API Connected.");
});