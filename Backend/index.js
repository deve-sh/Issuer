require("dotenv").config();

// Middlewares and dependencies
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = require("./app");
const router = require("./router");
const routes = require("./routes"); // Import all the modularized routes.

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

// All other routes
app.get("*", (req, res) => res.sendStatus(404));
app.post("*", (req, res) => res.sendStatus(404));
app.patch("*", (req, res) => res.sendStatus(404));
app.put("*", (req, res) => res.sendStatus(404));
app.delete("*", (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log("Listening at " + PORT));
