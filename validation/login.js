const isEmpty = require("./isEmpty");
const Validator = require("validator");


module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.password)) {
		errors.password = "Feld leer, geben Sie bitte Ihr Passwort ein";
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = "Geben Sie bitte eine korrekte Email Adresse an";
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = "Feld leer, geben Sie bitte Ihre Email an";
	}




	return {
		errors,
		isValid: isEmpty(errors)
	};
};