const isEmpty = require("./isEmpty");
const Validator = require("validator");


module.exports = function validateProfileInput(data) {
    let errors = {};
    //Wenn Eingabe null oder undefined leeren setzen, dann können wir mit Validator prüfen
    data.profileURL = !isEmpty(data.profileURL) ? data.profileURL : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if (!Validator.isLength(data.profileURL, { min: 2, max: 40 })) {
        errors.profileURL = "Profil URL muss zwischen 2 und 4 Zeichen lang sein";
    }
    if (Validator.isEmpty(data.profileURL)) {
        errors.profileURL = "Feld ist leer, bitte URL eingeben";
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Feld leer, bitte Skills eingeben";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Feld leer, bitte Status eingeben";
    }
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "Keine gültige URL";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};