const app = require("../../validation/profile");
const chai = require("chai");
const expect = chai.expect;

var urlRight = "http://testme.url/";

describe("Test profileValidation()", function () {
	it("Zu kurze ProfileURL angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				status: "testStatus",
				skills: "nodejs",
				profileURL: "d",
				website: urlRight
			}).errors.profileURL
		).to.equal("Profil URL muss zwischen 2 und 4 Zeichen lang sein");
	});

	it("Leere ProfileURL angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				status: "testStatus",
				skills: "nodejs",
				profileURL: "",
				website: urlRight
			}).errors.profileURL
		).to.equal("Feld ist leer, bitte URL eingeben");
	});

	it("Leeres Skills-Feld angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				status: "testStatus",
				skills: "",
				profileURL: urlRight,
				website: urlRight
			}).errors.skills
		).to.equal("Feld leer, bitte Skills eingeben");
	});

	it("Leeres Status-Feld angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				status: "",
				skills: "nodejs",
				profileURL: urlRight,
				website: urlRight
			}).errors.status
		).to.equal("Feld leer, bitte Status eingeben");
	});

	it("Keine gültige URL für die Website angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				status: "testStatus",
				skills: "nodejs",
				profileURL: urlRight,
				website: "notValid"
			}).errors.website
		).to.equal("Keine gültige URL");
	});
});
