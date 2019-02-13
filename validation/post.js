
const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function postValidation(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";


    if (Validator.isEmpty(data.text)) {
        errors.text = "Textfeld ist leer";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};