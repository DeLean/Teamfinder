const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//app ist Objekt von Express, new express(); auch möglich
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); //allows only objects as string and array
app.use(bodyParser.json());

//MongoDB Konfiguration
const db = require("./config/keys").mongoURI;
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log("MongooseDB connected"))
	.catch(err => console.log(err));


//Passport Middleware
app.use(passport.initialize());

//Passport Strategie in config/passport.js
require("./config/passport")(passport);

//Routen (URLs)
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//heroku || localport
const port = process.env.PORT || 7777;

//ES6 template literal
app.listen(port, () => console.log(`Server running on port ${port}`)); //eslint-disable-line 

module.exports = app;
