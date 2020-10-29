require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const email = require("./email");

const publicDirectory = path.join(__dirname, "../public");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/portfolio", (req, res) => {
	res.render("portfolio");
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.post("/sendEmail", async (req, res) => {
	await email(req.body.email, req.body.name, req.body.message);
	res.render("contact", { message: "Email Sent" });
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
