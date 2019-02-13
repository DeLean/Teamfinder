const app = require("../../validation/login");
const chai = require("chai");
const expect = chai.expect;

describe("Test loginValidation()", function () {
	it("Leere Email angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(app({ email: "", password: "test" }).errors.email).to.equal(
			"Feld leer, geben Sie bitte Ihre Email an"
		);
	});

	it("Keine korrekte Email angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(app({ email: "test.this", password: "test" }).errors.email).to.equal(
			"Geben Sie bitte eine korrekte Email Adresse an"
		);
	});

	it("Kein Passwort angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({ email: "test@this.com", password: "" }).errors.password
		).to.equal("Feld leer, geben Sie bitte Ihr Passwort ein");
	});
});
