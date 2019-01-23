const isEmpty = require("./isEmpty");
const Validator = require("validator");


module.exports = function validateEducationInput(data) {
    let errors = {};
    //Wenn Eingabe null oder undefined leeren setzen, dann können wir mit Validator prüfen
    data.institution = !isEmpty(data.institution) ? data.institution : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    //data.from = !isEmpty(data.from) ? data.from : "";
    //data.to = !isEmpty(data.to) ? data.to : "";



    if (Validator.isEmpty(data.institution)) {
        errors.institution = "Feld ist leer, bitte eine Schule eingeben";
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Feld leer, bitte einen Abschluss eingeben";
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "Feld leer, bitte Fachrichtung eingeben";
    }
    //if (Validator.isEmpty(data.from)) {
    //errors.from = "Feld leer, geben sie den Beginn an";
    // }

    //if (Validator.isEmpty(data.to)) {
    // errors.to = "Feld leer, geben sie das Ende an";
    //}



    return {
        errors,
        isValid: isEmpty(errors)
    };
};