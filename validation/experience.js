const isEmpty = require("./isEmpty");
const Validator = require("validator");


module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    //data.from = !isEmpty(data.from) ? data.from : "";
    //data.to = !isEmpty(data.to) ? data.to : "";



    if (Validator.isEmpty(data.title)) {
        errors.title = "Feld leer, geben Sie bitte Ihr einen Titel ein";
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = "Geben Sie bitte ein Unternehmen an";
    }

    //if (Validator.isEmpty(data.from)) {
    //errors.from = "Feld leer, geben Sie bitte Ihren Beginn an";
    //}

    //if (Validator.isEmpty(data.to)) {
    // errors.to = "Feld leer, geben Sie bitte das Ende an";
    //}



    return {
        errors,
        isValid: isEmpty(errors)
    };
};