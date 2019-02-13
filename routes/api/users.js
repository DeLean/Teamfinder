const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Input Validation laden
const registerValidation = require("../../validation/register");
const loginValidation = require("../../validation/login");
// User model laden
const User = require("../../models/User");

//@route  GET api/users/test
//@desc   tests users route
//@access Öffentlich
router.get("/test", (req, res) => res.json({ msg: "Nutzer route funktioniert" }));
//@route  GET api/users/test
//@desc   Register user
//@access Öffentlich
router.post("/register", (req, res) => {
	//req.body -> alles was zu dieser Route durch das Formular  gesendet wird
	const { errors, isValid } = registerValidation(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	//client post request über unser React.js Formular
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = "Email bereits vergeben!";
			return res.status(400).json({ errors });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar: avatar,
				password: req.body.password

			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {   //Klartext
					if (err) throw err;
					newUser.password = hash;                           // Gehashed
					newUser.save().then(user => res.json(user)).catch(err => console.log(err));

				});
			});
		}
	});
});
// @route GET api/users/login
// @desc Login User / Erhalten des JWT Token
// @access Öffentlich
router.post("/login", (req, res) => {
	const { errors, isValid } = loginValidation(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	//Nutzer über Email finden
	User.findOne({ email })
		.then(user => {
			if (!user) {
				errors.email = "Nutzer nicht gefunden";
				return res.status(404).json(errors);
			}
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						//User passt
						const payload = { id: user.id, name: user.name, avatar: user.avatar };
						// Token signieren
						jwt.sign(payload, keys.secretOrKey,
							{ expiresIn: 3600 },
							(err, token) => {
								res.json({
									success: true,
									token: "Bearer " + token
								});
							});
					} else {
						errors.password = "Passwort inkorrekt";
						return res.status(400).json({ errors });
					}
				});

		});
});

//@route  GET api/users/current
//@desc   Aktuellen Nutzer zurückgeben
//@access Privat
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
	//res.json(req.user);
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});
module.exports = router;
