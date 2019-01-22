const isEmpty = require("./isEmpty");
const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (Validator.isEmpty(data.password)) {
		errors.password = "Feld leer, geben Sie bitte das Passwort ein";
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Passwort sollte mindestens 6 Zeichen haben";
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Feld leer, bestätigen Sie ihr Passwort";
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwörter stimmen nicht überein";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Feld leer, geben Sie bitte das Passwort ein";
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Passwort sollte mindestens 6 Zeichen haben";
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Feld leer, bestätigen Sie ihr Passwort";
	}
	if (!Validator.equals(data.password2, data.password2)) {
		errors.password2 = "Passwörter stimmen nicht überein";
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Feld leer, geben Sie bitte das Passwort ein";
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Passwort sollte mindestens 6 Zeichen haben";
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Feld leer, bestätigen Sie ihr Passwort";
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwörter stimmen nicht überein";
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = "Geben Sie bitte eine korrekte Email Adresse an";
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = "Feld leer, geben Sie bitte eine Email an";
	}

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Der Name sollte zwischen 2 - 30 Zeichen besitzen";
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = "Feld leer, geben Sie bitte einen Namen ein";
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
