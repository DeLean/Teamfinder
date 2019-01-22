const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route  GET api/profile/
//@desc   Aktuelles Nutzerprofil
//@access Öffentlich
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.user.id })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "Es existiert kein Profil für diesen Nutzer";
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

//@route  POST api/profile/:profileurl
//@desc   Profil durch URL holen
//@access Public

router.get("/profileurl/:profileurl", (req, res) => {
	Profile.findOne({ profileURL: req.params.profileurl })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = " Es esxistiert kein Profil für diesen Nutzer";
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));

});

//@route  GET api/profile/all
//@desc   Alle Profile holen
//@access Public
router.get("/all", (req, res) => {
	const errors = {};
	Profile.find()
		.populate("user", ["name", "avatar"])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "Es existieren keine Profile";
				return res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: "Es existieren keine Profile" })
		);
});

//@route  GET api/profile/user/:user_id
//@desc   Profil durch Nutzer ID holen
//@access Public

router.get("/user/:user_id", (req, res) => {
	Profile.findOne({ profileURL: req.params.profileURL })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = " Es esxistiert kein Profil für diesen Nutzer";
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json({ profile: "Es existiert kein Profil für diesen Nutzer" }));

});

//@route  POST api/profile/
//@desc   Profil updaten und erstellen
//@access Privat

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.profileURL)
		profileFields.profileURL = req.body.profileURL;
	if (req.body.company)
		profileFields.company = req.body.company;
	if (req.body.website)
		profileFields.website = req.body.website;
	if (req.body.website)
		profileFields.location = req.body.location;
	if (req.body.bio)
		profileFields.bio = req.body.bio;
	if (req.body.status)
		profileFields.status = req.body.status;
	if (req.body.github)
		profileFields.github = req.body.github;
	if (typeof req.body.skills !== "undefined")
		profileFields.skills = req.body.skills.split(",");

	//Nutzer hat  Profil? dann update
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			if (profile) {
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				)
					.then(profile => res.json(profile));
			} else {
				//Nutzer hat kein Profil dann URL(handle prüfen)
				Profile.findOne({ profileURL: profileFields.profileURL }).then(profile => {
					if (profile) {
						errors.profileURL = "That handle already exists";
						res.status(400).json(errors);
					}
					//URL ok, Profil erstellen
					new Profile(profileFields).save().then(profile => res.json(profile));
				});
			}
		});
});
//@route  POST api/profile/experience
//@desc   Erfahrung hinzufügen
//@access Privat
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				const newExp = {
					title: req.body.title,
					company: req.body.company,
					location: req.body.location,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description
				};

				// An den Anfang des Arrays
				profile.experience.unshift(newExp);
				console.log(profile.experience);

				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json({ err: "369" }));


	}
);


//@route  DELETE api/profile/experience/:exp_i
//@desc   Erfahrung löschen
//@access Privat
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {

				const removeIndex = profile.experience
					.map(item => item.id)
					.indexOf(req.params.exp_id);

				profile.experience.splice(removeIndex, 1);

				// Save
				profile.save().then(profile => res.json(profile));
			});
	}
);
// @route   POST api/profile/education
// @desc    Bildung hinzufügen
// @access  Privat
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);
		if (!isValid) {

			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				const newEdu = {
					institution: req.body.institution,
					degree: req.body.degree,
					fieldofstudy: req.body.fieldofstudy,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description
				};


				profile.education.unshift(newEdu);

				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json({ err: "369" }));




	}
);
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndrRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() =>
				res.json({ profileDeleted: true, })
			);
		});
	}
);

module.exports = router;

module.exports = router;
