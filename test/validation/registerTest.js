const app = require("../../validation/register");
const chai = require("chai");
const expect = chai.expect;

var name = "Name";
var email = "Names@mail.com";
var password = "namesPassword";
var password2 = "namesPassword";

describe("Test registerValidation()", function () {
	it("Leeren Namen angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: "",
				email: email,
				password: password,
				password2: password2
			}).errors.name
		).to.equal("Feld leer, geben Sie bitte einen Namen ein");
	});

	it("Zu kurzer Name angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: "s",
				email: email,
				password: password,
				password2: password2
			}).errors.name
		).to.equal("Der Name sollte zwischen 2 - 30 Zeichen besitzen");
	});

	it("Email leer angegeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: name,
				email: "",
				password: password,
				password2: password2
			}).errors.email
		).to.equal("Feld leer, geben Sie bitte eine Email an");
	});

	it("Keine korrekte Email angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: name,
				email: "email.this",
				password: password,
				password2: password2
			}).errors.email
		).to.equal("Geben Sie bitte eine korrekte Email Adresse an");
	});

	it("Passwörter stimmen nicht überein -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: name,
				email: email,
				password: "passwordWRONG",
				password2: password2
			}).errors.password2
		).to.equal("Passwörter stimmen nicht überein");
	});

	it("Password2 leer angegeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: name,
				email: email,
				password: password,
				password2: ""
			}).errors.password2
		).to.equal("Feld leer, bestätigen Sie ihr Passwort");
	});

	it("Zu kurzeres Passwort angeben -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: name,
				email: email,
				password: "1234",
				password2: password2
			}).errors.password
		).to.equal("Passwort sollte mindestens 6 Zeichen haben");
	});

	it("Leeres Passwort Feld -> Antwort mit korrekter Fehlermeldung", function () {
		expect(
			app({
				name: name,
				email: email,
				password: "",
				password2: password2
			}).errors.password
		).to.equal("Feld leer, geben Sie bitte das Passwort ein");
	});
});
